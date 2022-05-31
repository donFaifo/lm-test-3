import React = require("react");
import { Col, Row } from "react-bootstrap";
import Subsection from "./EstimationListComponents/Subsection";

interface Props {
  subsections: Array<any>
}

export default class EstimationList extends React.Component<Props> {
  constructor(props) {
    super(props)
  }

  render() {
    let subsections: Array<JSX.Element>
    subsections = []
    this.props.subsections.map((elem) => {
      subsections.push((
        <Subsection
          title={elem.type}
          product={elem.product}
          key={elem.type} />))
    })

    return <>
      {subsections}
    </>
  }
}