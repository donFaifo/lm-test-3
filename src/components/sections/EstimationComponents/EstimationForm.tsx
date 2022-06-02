import React = require("react");
import { Button, Col, Form, Row } from "react-bootstrap";
import { SubsectionData } from "../Estimation";
import { Article } from "./EstimationListComponents/Subsection";

interface Props {
  isHidden: boolean
  saveBtnHandler(product: SubsectionData): void
}

interface State {
  type: string
  article: Article
}

export default class EstimationForm extends React.Component<Props, State> {

  refType: any

  constructor(props) {
    super(props)

    this.state = {
      type: "Paneles",
      article: {
        description: "",
        ref: 0,
        qt: 0,
        price: 0
      }
    }

    this.handleType = this.handleType.bind(this)
    this.handleDescription = this.handleDescription.bind(this)
    this.handleRef = this.handleRef.bind(this)
    this.handleQt = this.handleQt.bind(this)
    this.handlePrice = this.handlePrice.bind(this)
    this.save =this.save.bind(this)

    this.refType = React.createRef()
  }

  handleType(event) {
    this.setState({
      type: event.target.value
    })
  }

  handleDescription(event) {
    this.setState({
      article:{
        description: event.target.value,
        ref: this.state.article.ref,
        qt: this.state.article.qt,
        price: this.state.article.price,
      }
    })
  }

  handleRef(event) {
    this.setState({
      article:{
        description: this.state.article.description,
        ref: event.target.value,
        qt: this.state.article.qt,
        price: this.state.article.price,
      }
    })
  }

  handleQt(event) {
    this.setState({
      article:{
        description: this.state.article.description,
        ref: this.state.article.ref,
        qt: event.target.value,
        price: this.state.article.price,
      }
    })
  }

  handlePrice(event) {
    this.setState({
      article:{
        description: this.state.article.description,
        ref: this.state.article.ref,
        qt: this.state.article.qt,
        price: event.target.value,
      }
    })
  }

  save() {
    this.refType.current.focus()
    this.props.saveBtnHandler({
      type: this.state.type,
      product: [this.state.article]
    })
    this.setState({
      type: "Paneles",
      article: {
        description: "",
        ref: 0,
        qt: 0,
        price: 0
      }
    })
  }

  render() {
    if(this.props.isHidden) return <></>

    return <Row>
      <Col>
        <Form>
          <Row>
            <Col xs="12" md="4" xl="3" className="mb-4">
              <Form.Label htmlFor="type">Tipo</Form.Label>
              <Form.Select 
                id="type" 
                onChange={this.handleType} 
                value={this.state.type}
                ref={this.refType}>
                <option value="Paneles">Paneles</option>
                <option value="Baterías">Baterías</option>
                <option value="Controlador">Controlador</option>
                <option value="Inversor">Inversor</option>
                <option value="Estructura">Estructura</option>
                <option value="Cableado">Cableado</option>
                <option value="Otros">Otros</option>
              </Form.Select>
            </Col>
            <Col xs="12" md="8" xl="5" className="mb-4">
              <Form.Label htmlFor="description">Descripción</Form.Label>
              <Form.Control 
                id="description"
                type="text" 
                placeholder="Descripción del producto"
                onChange={this.handleDescription}
                value={this.state.article.description}/>
            </Col>
            <Col className="mb-4" xs="12" md="4" xl="2">
              <Form.Label htmlFor="ref">Referencia</Form.Label>
              <Form.Control 
                id="ref"
                type="number" 
                placeholder="Referencia LM"
                onChange={this.handleRef}
                value={this.state.article.ref}/>
            </Col>
            <Col className="mb-4" xs="12" md="2" xl="2">
              <Form.Label htmlFor="qt">Cantidad</Form.Label>
              <Form.Control 
                id="qt"
                type="number" 
                placeholder="Cantidad"
                onChange={this.handleQt}
                value={this.state.article.qt}/>
            </Col>
            <Col className="mb-4" xs="12" md="3" xl="3">
              <Form.Label htmlFor="price">Precio unitario</Form.Label>
              <Form.Control 
                id="price"
                type="number" 
                placeholder="Precio por unidad"
                onChange={this.handlePrice}
                value={this.state.article.price}/>
            </Col>
            <Col className="d-flex align-items-end mb-4" xs="2">
              <Button onClick={this.save}>Guardar</Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  }
}