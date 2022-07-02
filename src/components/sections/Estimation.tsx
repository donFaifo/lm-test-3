import React = require("react");
import Section from "./Section";
import EstimationList from "./EstimationComponents/EstimationList";
import EstimationForm from "./EstimationComponents/EstimationForm";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Article } from "./EstimationComponents/EstimationListComponents/Subsection";

interface Props {
  pw: number;
  amph: number;
}

interface States {
  inputHidden: boolean
  estimationProducts: Article[]
  showCanvas: boolean
  customerName: string
  customerMail: string
}

enum Action {
  Save = "GUARDAR",
  Send = "ENVIAR"
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

  addNewProduct(product: Article) {
    this.state.estimationProducts.push(product);
    this.setState({
      estimationProducts: this.state.estimationProducts,
    });
  }

  saveEstimation(action: Action) {
    let data: any
    let customerName: string
    let customerMail: string

    customerName = this.state.customerName
    customerMail = this.state.customerMail
    
    data = {
      name: customerName,
      mail: customerMail,
      send: (action == Action.Send),
      list: this.state.estimationProducts
    }

    this.setState({
      showCanvas: false
    })

    // @ts-ignore
    google.script.run.withSuccessHandler(()=>{
      if(data.send) {
        alert("Documento guardado y enviado")
      } else {
        alert("Documento guardado")
      }
    }).createEstimate(data)
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
    let productList: Article[];
    let total: JSX.Element;
    let options: JSX.Element;
    let totalPrice: number;

    totalPrice = 0;

    productList = this.state.estimationProducts;

    if (productList.length != 0) {
      productList.forEach(item => {
        totalPrice += item.price * item.qt;
      })

      total = (
        <Row className="mt-4">
          <hr></hr>
          <Col className="d-flex justify-content-end">
            <h4>TOTAL: {totalPrice.toFixed(2)} €</h4>
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
              <Button size="sm" onClick={this.saveEstimation.bind(this, Action.Save)}>Guardar Presupuesto</Button>
              <Button variant="success" size="sm" onClick={this.saveEstimation.bind(this, Action.Send)}>Enviar por mail</Button>            
          </Modal.Footer>
        </Modal.Body>
      </Modal>

      <EstimationForm 
        isHidden={this.state.inputHidden} 
        saveBtnHandler={(product) => {this.addNewProduct(product)}}
        pw={this.props.pw}
        amph={this.props.amph}
      />

      <EstimationList products={this.state.estimationProducts}/>

      {total}
      {options}
    </Section>
  }
}