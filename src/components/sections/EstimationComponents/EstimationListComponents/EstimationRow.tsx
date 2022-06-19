import React = require("react");
import { Col, Row } from "react-bootstrap";

interface Props {
  description: string;
  qt: number;
  price: number;
  reference: string;
};

const EstimationRow = (props: Props) => {
  return (
    <Row>
      <Col xs="6" xl="2" className="justify-content-start">{props.reference}</Col>
      <Col xs="12" md="6" xl="5">{props.description}</Col>
      <Col xs="6" xl="2" className="d-flex justify-content-end">x {props.qt}</Col>
      <Col xs="12" md="6" xl="3" className="d-flex justify-content-end">{props.price} €/u</Col>
    </Row>
  )
}

export default EstimationRow;