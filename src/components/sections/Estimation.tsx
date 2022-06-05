import React = require("react");
import Section from "./Section";
import EstimationList from "./EstimationComponents/EstimationList";
import EstimationForm from "./EstimationComponents/EstimationForm";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Article } from "./EstimationComponents/EstimationListComponents/Subsection";

export interface SubsectionData {
  type: string
  product: Article[]
}

interface Props { }

interface States {
  inputHidden: boolean
  estimationProducts: SubsectionData[]
  showCanvas: boolean
  customerName: string
  customerMail: string
}

export default class Estimation extends React.Component<Props, States> {
  constructor(props) {
    super(props)

    this.state = {
      inputHidden: true,
      estimationProducts: [],
      showCanvas: false,
      customerName: "",
      customerMail: ""
    }

    this.btnHandler = this.btnHandler.bind(this)
    this.cleanEstimation = this.cleanEstimation.bind(this)
    this.addNewProduct = this.addNewProduct.bind(this)
    this.saveEstimation = this.saveEstimation.bind(this)
    this.showCanvas = this.showCanvas.bind(this)
    this.closeCanvas = this.closeCanvas.bind(this)
    this.customerMailHandler = this.customerMailHandler.bind(this)
    this.customerNameHandler = this.customerNameHandler.bind(this)
  }

  btnHandler() {
    this.setState({
      inputHidden: !this.state.inputHidden
    })
  }

  cleanEstimation() {
    this.setState({
      estimationProducts: []
    })
  }

  addNewProduct(product: SubsectionData) {
    let temp = this.state.estimationProducts
    let index = temp.findIndex((elem) => {
      return elem.type == product.type
    })

    if(index != -1) {
      temp[index].product.push(product.product[0])
    } else {
      temp.push(product)
    }
    
    this.setState({
      estimationProducts: temp
    })
  }

  saveEstimation() {
    let data: any
    let customerName: string

    customerName = prompt("Nombre del cliente:", "UNNAMED");

    data = {
      name: customerName,
      list: this.state.estimationProducts
    }

    // @ts-ignore
    google.script.run.withSuccessHandler().createEstimate(data)
  }

  showCanvas() {
    this.setState({
      showCanvas: true
    })
  }

  closeCanvas() {
    this.setState({
      showCanvas: false
    })
  }

  customerNameHandler(event) {
    this.setState({
      customerName: event.target.value
    })
  }

  customerMailHandler(event) {
    this.setState({
      customerMail: event.target.value
    })
  }

  render() {
    let subsectionsData: SubsectionData[]
    let total: JSX.Element
    let options: JSX.Element
    let totalPrice: number

    totalPrice = 0

    subsectionsData = this.state.estimationProducts

    if (subsectionsData.length != 0) {
      for (let i = 0; i < subsectionsData.length; i++) {
        let subtotal = 0
        for (let j = 0; j < subsectionsData[i].product.length; j++) {
          subtotal += subsectionsData[i].product[j].price * subsectionsData[i].product[j].qt
        }
        totalPrice += subtotal
      }

      total = (
        <Row className="mt-4">
          <hr></hr>
          <Col className="d-flex justify-content-end">
            <h4>TOTAL: {totalPrice} €</h4>
          </Col>
        </Row>
      )

      options = (
        <Row className="mt-4">
          <Col>
            <Button
              size="sm"
              onClick={this.showCanvas}
            >Guardar presupuesto</Button>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button
              variant="danger"
              size="sm"
              onClick={this.cleanEstimation}
            >Limpiar presupuesto</Button>
          </Col>
        </Row>
      )
    } else {
      total = <></>
      options = <></>
    }



    return <Section
      name="Presupuesto"
      button="Añadir línea"
      btnHandler={this.btnHandler}
    >
      <Modal show={this.state.showCanvas} onHide={this.closeCanvas}>
        <Modal.Header closeButton>
          <Modal.Title>Datos cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col xs="12" className="mb-3">
                <Form.Label>Nombre cliente</Form.Label>
                <Form.Control 
                  id="customerName"
                  type="text" 
                  onChange={this.customerNameHandler}
                  value={this.state.customerName}/>
              </Col>
              <Col xs="12" className="mb-3">
                <Form.Label>Mail cliente</Form.Label>
                <Form.Control 
                  id="customerName"
                  type="mail" 
                  onChange={this.customerMailHandler}
                  value={this.state.customerMail}/>
              </Col>
            </Row>
            </Form>
          <Modal.Footer>
              <Button size="sm" onClick={()=>{console.log("Guardado")}}>Guardar Presupuesto</Button>
              <Button variant="success" size="sm" onClick={()=>{console.log("Enviado")}}>Enviar por mail</Button>            
          </Modal.Footer>
        </Modal.Body>
      </Modal>
      <EstimationForm 
        isHidden={this.state.inputHidden} 
        saveBtnHandler={this.addNewProduct}
        />
      <EstimationList subsections={subsectionsData} />
      {total}
      {options}
    </Section>
  }
}