import React = require("react");
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { InputDataType } from "./InputDataList";

interface Props {
  hidden: boolean
  saveHandler(record: InputDataType): any
}

export default class InputDataForm extends React.Component<Props> {
  constructor(props) {
    super(props)
    this.save.bind
  }

  save() {

  }

  render() {
    if (this.props.hidden) {
      return <></>
    }
    return <Row>
      <Form>
        <Row>
          <Col sm="12" md="4" className="mb-3">
            <Form.Label>Tipo</Form.Label>
            <Form.Select>
              <option selected>Elige una opción</option>
              <option>Motor</option>
              <option>Iluminación</option>
              <option>Aparato electrónico</option>
            </Form.Select>
          </Col>
          <Col sm="12" md="2" className="mb-3">
            <Form.Label>Cantidad</Form.Label>
            <Form.Control type="number" placeholder="Cantidad de elementos"></Form.Control>
          </Col>
          <Col sm="12" md="3" className="mb-3">
            <Form.Label>Potencia (W)</Form.Label>
            <Form.Control type="number" placeholder="Potencia instantánea consumida"></Form.Control>
          </Col>
          <Col sm="12" md="2" className="mb-3">
            <Form.Label>Horas de uso</Form.Label>
            <Form.Control type="number" placeholder="Horas de uso medio al día"></Form.Control>
          </Col>
          <Col sm="12" md="1" className="mb-3 d-flex align-items-end">
            <Button onClick={this.props.saveHandler({
              id: 99,
              qt: 1,
              type: "Motor",
              pw: 700,
              use: 3
            })}>Guardar</Button>
          </Col>
        </Row>
      </Form>

    </Row>
  }
}