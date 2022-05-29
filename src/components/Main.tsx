import React = require("react")
import Container from "react-bootstrap/Container"
import Results from "./sections/Results"
import InputData from "./sections/InputData"
import EstimationList from "./sections/EstimationList"
import { InputDataType } from "./sections/InputDataList"

interface Props { }

interface States {
  data: InputDataType[],
  voltage: number,
  peekHours: number,
  panelEficiency: number,
  dischargeDeep: number
}

class Main extends React.Component<Props, States> {
  constructor(props) {
    super(props)
    this.state ={
      data: [],
      voltage: 12,
      peekHours: 3.2,
      panelEficiency: 0.9,
      dischargeDeep: 0.6
    }

    this.saveNewData = this.saveNewData.bind(this)
  }

  saveNewData(record: InputDataType) {
    this.state.data.push(record)
    this.setState({
      data: this.state.data
    })
  }

  render() {

    return <Container className="mt-3">
      
      <InputData 
        data={this.state.data} 
        dataHandler={this.saveNewData}/>

      <Results 
        data={this.state.data}
        peekHours={this.state.peekHours}
        panelEficiency={this.state.panelEficiency}
        dischargeDeep={this.state.dischargeDeep}
        voltage={this.state.voltage}/>

      <EstimationList />
      
    </Container>
  }
}

export default Main