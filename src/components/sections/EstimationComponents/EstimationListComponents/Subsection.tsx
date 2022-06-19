import React = require("react");
import { Col, Row } from "react-bootstrap";
import EstimationRow from "./EstimationRow";

export interface Article {
  type: string;
  description: string;
  ref: string;
  qt: number;
  price: number;
};

interface Props {
  title: string;
  products: Article[];
};

export default class Subsection extends React.Component<Props> {

  render() {

    let productList: Array<JSX.Element>
    productList = []

    this.props.products.map((article, id) => {
      productList.push((
        <EstimationRow
          key={id}
          description={article.description}
          reference={article.ref}
          qt={article.qt}
          price={article.price}
        />
      ));
    });

    return <Row className="mb-3">
      <Col>
        <h6>{this.props.title}</h6>
        <hr></hr>
        {productList}
      </Col>
    </Row>
  }
}
