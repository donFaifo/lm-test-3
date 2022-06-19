import React = require("react")
import Container from "react-bootstrap/Container"
import Results from "./sections/Results"
import InputData from "./sections/InputData"
import Estimation from "./sections/Estimation"
import { InputDataType } from "./sections/InputDataComponents/InputDataList"

interface Props { }

interface States {
  data: InputDataType[];
  voltage: number;
  peekHours: number;
  panelEficiency: number;
  dischargeDeep: number;
  requiredPower: number;
  averageEnergy: number;
  requiredCapacity: number;
  autonomyDays: number;
}

class Main extends React.Component<Props, States> {
  constructor(props) {
    super(props)
    this.state ={
      data: [],
      voltage: 12,
      peekHours: 3.2,
      panelEficiency: 0.9,
      dischargeDeep: 0.6,
      autonomyDays: 1,
      requiredPower: 0,
      averageEnergy: 0,
      requiredCapacity: 0,
    };

    this.saveNewData = this.saveNewData.bind(this)
    this.clearData = this.clearData.bind(this)
  }

  saveNewData(record: InputDataType) {
    let kwh: number = 0;
    let pw: number;
    let amph: number;

    this.state.data.push(record);
    this.state.data.map((item) => {
      kwh += item.pw * item.qt * item.use;
    });
    pw = (kwh / this.state.panelEficiency) / this.state.peekHours;
    amph = ((kwh / this.state.voltage)/this.state.dischargeDeep)  * this.state.autonomyDays;

    this.setState({
      data: this.state.data,
      requiredPower: pw,
      averageEnergy: kwh,
      requiredCapacity: amph,
    });
  }

  clearData() {
    this.setState({
      data: [],
      averageEnergy: 0,
      requiredCapacity: 0,
      requiredPower: 0,
    });
  }

  render() {

    return <Container className="mt-3">
      
      <InputData 
        data={this.state.data} 
        dataHandler={this.saveNewData}
        dataCleaner={this.clearData}/>

      <Results 
        data={this.state.data}
        peekHours={this.state.peekHours}
        panelEficiency={this.state.panelEficiency}
        dischargeDeep={this.state.dischargeDeep}
        voltage={this.state.voltage}
        pw={this.state.requiredPower}
        amph={this.state.requiredCapacity}
        kwh={this.state.averageEnergy}
      />

      <Estimation 
        pw={this.state.requiredPower}
        amph={this.state.requiredCapacity}
      />
      
    </Container>
  }
}

export default Main