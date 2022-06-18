import React = require("react")
import ResultCard from "./ResultsComponents/ResultCard"
import { CardGroup } from "react-bootstrap"
import Section from "./Section"
import { InputDataType } from "./InputDataComponents/InputDataList"

interface Props {
  data: InputDataType[];
  voltage: number;
  peekHours: number;
  panelEficiency: number;
  dischargeDeep: number;
  pw: number;
  kwh: number;
  amph: number;
}

class Results extends React.Component<Props> {
  
  render() {
    let avEnergy = (this.props.kwh/1000).toFixed(2).toString()
    let batCapacity = this.props.amph.toFixed(1).toString()
    let power = this.props.pw.toFixed(1).toString()

    return <Section name="Datos calculados">
      <CardGroup>
        <ResultCard
          header="Energia media diaria"
          color="energy-card">
          {avEnergy} kWh
        </ResultCard>

        <ResultCard
          header="Capacidad necesaria baterías"
          color="capacity-card">
          {batCapacity} Ah
        </ResultCard>

        <ResultCard
          header="Potencia necesaria paneles"
          color="power-card">
          {power} W
        </ResultCard>
      </CardGroup>
    </Section>
  }
}

export default Results