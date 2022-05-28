import React = require("react")
import ResultCard from "./ResultCard"
import { CardGroup } from "react-bootstrap"
import Section from "../Section"
import { InputDataType } from "./InputDataList"

interface Props {
  data: InputDataType[],
  voltage: number,
  peekHours: number,
  panelEficiency: number,
  dischargeDeep: number
}

class Results extends React.Component<Props> {
  
  render() {
    let kwh: number = 0
    let amph: number
    let pw: number
    let amps: number

    this.props.data.map((item) => {
      kwh += item.pw * item.qt * item.use
    })

    amph = kwh / this.props.voltage
    pw = amph * this.props.voltage / this.props.panelEficiency

    let avEnergy = kwh.toString()
    let batCapacity = amph.toString()
    let power = pw.toString()
    let amperage = "0.0"

    return <Section name="Datos calculados">
      <CardGroup>
        <ResultCard
          header="Energia media diaria"
          color="danger">
          {avEnergy} kWh
        </ResultCard>

        <ResultCard
          header="Capacidad necesaria baterías"
          color="secondary">
          {batCapacity} Ah
        </ResultCard>

        <ResultCard
          header="Potencia necesaria paneles"
          color="success">
          {power} W
        </ResultCard>

        <ResultCard
          header="Amperaje necesario controlador"
          color="warning">
          {amperage} A
        </ResultCard>
      </CardGroup>
    </Section>
  }
}

export default Results