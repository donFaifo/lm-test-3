import React = require("react");
import { Button, Col, Form, Row } from "react-bootstrap";

interface Props {
  isHidden: boolean
}

export default class EstimationForm extends React.Component<Props> {

  constructor(props) {
    super(props)
  }

  render() {
    if(this.props.isHidden) return <></>

    return <Row>
      <Col>
        <Form>
          <Row>
            <Col xs="12" md="4" xl="3" className="mb-4">
              <Form.Label htmlFor="type">Tipo</Form.Label>
              <Form.Select id="type">
                <option value="panel">Panel solar</option>
                <option value="battery">Batería</option>
                <option value="controller">Controlador de carga</option>
                <option value="inverter">Inversor</option>
                <option value="structure">Estructura</option>
                <option value="cable">Cableado</option>
                <option value="other">Otros</option>
              </Form.Select>
            </Col>
            <Col xs="12" md="8" xl="5" className="mb-4">
              <Form.Label htmlFor="description">Descripción</Form.Label>
              <Form.Control 
                id="description"
                type="text" 
                placeholder="Descripción del producto"/>
            </Col>
            <Col className="mb-4" xs="12" md="4" xl="2">
              <Form.Label htmlFor="ref">Referencia</Form.Label>
              <Form.Control 
                id="ref"
                type="number" 
                placeholder="Referencia LM"/>
            </Col>
            <Col className="mb-4" xs="12" md="2" xl="2">
              <Form.Label htmlFor="qt">Cantidad</Form.Label>
              <Form.Control 
                id="qt"
                type="number" 
                placeholder="Cantidad"/>
            </Col>
            <Col className="mb-4" xs="12" md="3" xl="3">
              <Form.Label htmlFor="price">Precio unitario</Form.Label>
              <Form.Control 
                id="price"
                type="number" 
                placeholder="Precio por unidad"/>
            </Col>
            <Col className="d-flex align-items-end mb-4" xs="2">
              <Button>Guardar</Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  }
}