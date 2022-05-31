import React = require("react");
import { Col, Row } from "react-bootstrap";

export interface Article {
  description: string
  ref: number
  qt: number
  price: number
}

interface Props {
  title: string
  product: Array<Article>
}

export default class Subsection extends React.Component<Props> {

  render() {

    let productList: Array<JSX.Element>
    productList = []

    this.props.product.map((article) => {
      productList.push((
        <Row key={article.ref}>
          <Col xs="12" md="6" xl="4">{article.description}</Col>
          <Col xs="6" xl="3" className="justify-content-start">{article.ref}</Col>
          <Col xs="6" xl="2" className="d-flex justify-content-end">x {article.qt}</Col>
          <Col xs="12" md="6" xl="3" className="d-flex justify-content-end">{article.price} €/u</Col>
        </Row>
      ))
    })
    return <Row className="mb-3">
      <Col>
        <h6>{this.props.title}</h6>
        <hr></hr>
        {productList}
      </Col>
    </Row>
  }
}