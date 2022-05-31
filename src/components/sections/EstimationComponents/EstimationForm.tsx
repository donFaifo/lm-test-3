import React = require("react");
import { Col, Row } from "react-bootstrap";

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
        <p>Formulario</p>
      </Col>
    </Row>
  }
}