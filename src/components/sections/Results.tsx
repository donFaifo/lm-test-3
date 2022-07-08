import React = require("react")
import ResultCard from "./ResultsComponents/ResultCard"
import { CardGroup, Col, Form, Row } from "react-bootstrap"
import Section from "./Section"
import { InputDataType } from "./InputDataComponents/InputDataList"

interface Props {
  onChangeAutonomy(nDays: number): void;
  onChancePeekHours(nHours: number): void;
  data: InputDataType[];
  voltage: number;
  peekHours: number;
  panelEficiency: number;
  dischargeDeep: number;
  pw: number;
  kwh: number;
  amph: number;
  autonomy: number;
}

class Results extends React.Component<Props> {
  
  render() {
    let avEnergy = (this.props.kwh/1000).toFixed(2).toString();
    let batCapacity = this.props.amph.toFixed(1).toString();
    let power = this.props.pw.toFixed(1).toString();

    return <Section name="Datos calculados">
      <Row className="mb-3">
        <Col><h6>Configuración</h6></Col>
      </Row>
      <Row className="mb-3">
        <Form>
          <Form.Group as={Row}>
            <Form.Label column sm={1} md={2} lg={1} htmlFor="use">HPS:</Form.Label>
            <Col sm={6} lg={4} className="col-8">
              <Form.Select id="use" size="sm">
                <option defaultValue="fullYear">Uso para todo el año</option>
                <option value="summer">Uso solo en verano</option>
              </Form.Select>
            </Col>
            <Col sm={4} lg={1} className="col-4">
              <Form.Control type="number" size="sm" defaultValue={this.props.peekHours}/>
            </Col>
            <Form.Label column sm={4} lg={3} htmlFor="use">Días de autonomía:</Form.Label>
            <Col sm={8} lg={3}>
              <Form.Control type="number" size="sm" defaultValue={this.props.autonomy}/>
            </Col>
          </Form.Group>
        </Form>
      </Row>
      <CardGroup>
        <ResultCard
          header="Energia media diaria"
          color="energy-card">
          {avEnergy} kWh
        </ResultCard>

        <ResultCard
          header="Potencia necesaria paneles"
          color="power-card">
          {power} W
        </ResultCard>

        <ResultCard
          header="Capacidad necesaria baterías"
          color="capacity-card">
          {batCapacity} Ah
        </ResultCard>
      </CardGroup>
    </Section>
  }
}

export default Results