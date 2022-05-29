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
      data: [
        {id: 1, type: "Motor", qt: 1, pw: 700, use: 3},
        {id: 2, type: "Iluminación", qt: 4, pw: 10, use: 6},
        {id: 3, type: "Electrónicos", qt: 2, pw: 90, use: 4},
        {id: 4, type: "Electróncios", qt: 1, pw: 150, use: 3},
      ],
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
      
      <InputData data={this.state.data} dataHandler={this.saveNewData}/>

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