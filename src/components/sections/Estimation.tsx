import React = require("react");
import Section from "./Section";
import EstimationList from "./EstimationComponents/EstimationList";
import EstimationForm from "./EstimationComponents/EstimationForm";
import { Button, Col, Row } from "react-bootstrap";

import { Article } from "./EstimationComponents/EstimationListComponents/Subsection";

export interface SubsectionData {
  type: string
  product: Article[]
}

interface Props { }

interface States {
  inputHidden: boolean
  estimationProducts: SubsectionData[]
}

export default class Estimation extends React.Component<Props, States> {
  constructor(props) {
    super(props)

    this.state = {
      inputHidden: true,
      estimationProducts: [
        {
          type: "Paneles",
          product: [
            {
              description: "PANEL SOLAR 120W, 24V",
              ref: 12345678,
              qt: 4,
              price: 79
            }
          ]
        }, {
          type: "Baterías",
          product: [
            {
              description: "BATERÍA 24V 250AH",
              ref: 87654321,
              qt: 2,
              price: 200
            }
          ]
        }, {
          type: "Controlador",
          product: [
            {
              description: "CONTROLADOR 20A 12/24V",
              ref: 98765432,
              qt: 1,
              price: 59
            }
          ]
        }, {
          type: "Inversor",
          product: [
            {
              description: "INVERSOR ONDA PURA 3000W 24V",
              ref: 32165498,
              qt: 1,
              price: 650
            }
          ]
        }, {
          type: "Estructura",
          product: [
            {
              description: "SOPORTE PANEL X2 CUBIERTA PLANA",
              ref: 45698712,
              qt: 1,
              price: 120
            }, {
              description: "EXTENSIÓN SOPORTE PANEL X1 CUBIERTA PLANA",
              ref: 45698713,
              qt: 2,
              price: 60
            }
          ]
        }, {
          type: "Cableado",
          product: [
            {
              description: "CABLE ROJO 10MM 100M",
              ref: 78965412,
              qt: 1,
              price: 89
            }, {
              description: "CABLE NEGRO 10MM 100M",
              ref: 78965413,
              qt: 1,
              price: 89
            }
          ]
        }
      ]
    }

    this.btnHandler = this.btnHandler.bind(this)
    this.cleanEstimation = this.cleanEstimation.bind(this)
    this.addNewProduct = this.addNewProduct.bind(this)
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