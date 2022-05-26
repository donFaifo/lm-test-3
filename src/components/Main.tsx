import React = require("react")
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import ResultCard from "./ResultCard"

interface Props {}

interface States {
  averageEnergy: number,
  bateryCapacity: number,
  requiredPower: number,
  totalAmperage: number
}

class Main extends React.Component<Props, States> {
  constructor(props){
    super(props)
    this.state = {
      averageEnergy: 0.0,
      bateryCapacity: 0.0,
      requiredPower: 0.0,
      totalAmperage: 0.0
    }
  }

  render() {
    let avEnergy = this.state.averageEnergy.toString()
    let batCapacity = this.state.bateryCapacity.toString()
    let power = this.state.requiredPower.toString()
    let amperage = this.state.totalAmperage.toString()

    return <Container className="mt-3">
      <Row>
        <Col>
          <Card>
            <Card.Header>Datos de consumo</Card.Header>
            <Card.Body>
              <Card.Text>Aquí los datos de consumo</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Card>
            <Card.Header>Datos calculados</Card.Header>
            <Card.Body>
              <Row>
                <Col><ResultCard header="Energia media diaria">{avEnergy} kWh</ResultCard></Col>
                <Col><ResultCard header="Capacidad necesaria baterías">{batCapacity} Ah</ResultCard></Col>
                <Col><ResultCard header="Potencia necesaria paneles">{power} W</ResultCard></Col>
                <Col><ResultCard header="Amperaje necesario controlador">{amperage} A</ResultCard></Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  }
}

export default Main