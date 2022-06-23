import React = require("react");
import { Button, Col, Form, Row } from "react-bootstrap";
import { Article } from "./EstimationListComponents/Subsection";

interface Props {
  addAction(product: Article): void;
}

const OthersProductForm = (props: Props) => {
  const [qt, setQt] = React.useState<number>(0);
  const [price, setPrice] = React.useState<number>(0);
  const [product, setProduct] = React.useState<Article>({
    ref: '',
    type: '',
    description: '',
    price: 0,
    qt: 0,
  });

  return (
    <Row className="mb-3">
      <Col className="mb-3 col-12 col-md-3 col-lg-2">
        <Form.Label htmlFor="ref">Ref</Form.Label>
        <Form.Control id="ref" type="text" onChange={ev => {
          setProduct({
            ref: ev.target.value,
            type: 'Other',
            description: product.description,
            price: product.price,
            qt: product.qt,
          })
        }}/>
      </Col>
      <Col className="mb-3 col-12 col-md-9 col-lg-4">
        <Form.Label htmlFor="product">Descripción</Form.Label>
        <Form.Control id="product" type="text" onChange={ev => {
          setProduct({
            ref: product.ref,
            type: 'Other',
            description: ev.target.value,
            price: product.price,
            qt: product.qt,
          })
        }}/>
      </Col>
      <Col className="mb-3 col-12 col-md-4 col-lg-2">
        <Form.Label htmlFor="qt">Cantidad</Form.Label>
        <Form.Control 
          id="qt"
          placeholder="Cantidad"
          type="number"
          value={qt}
          onChange={ev => {
            setQt(Number.parseInt(ev.currentTarget.value));
            setProduct({
              type: product.type,
              price: product.price,
              ref: product.ref,
              description: product.description,            
              qt: Number.parseFloat(ev.currentTarget.value),
            });
          }}
          onClick={ev => {
            ev.currentTarget.select();
          }}
        />
      </Col>
      <Col className="mb-3 col-12 col-md-4 col-lg-2">
        <Form.Label htmlFor="price">Precio unitario</Form.Label>
        <Form.Control 
          id="price"
          placeholder="Precio €"
          type="number"
          value={price}
          onChange={ev => {
            setPrice(Number.parseFloat(ev.currentTarget.value));
            setProduct({
              type: product.type,
              price: Number.parseFloat(ev.currentTarget.value),
              ref: product.ref,
              description: product.description,            
              qt: product.qt,
            });
          }}
          onClick={ev => {
            ev.currentTarget.select();
          }}
        />
      </Col>
      <Col className="d-flex align-items-center">
          <Button variant="success" className="mt-3" onClick={(ev) => props.addAction(product)}>Añadir</Button>
      </Col>
    </Row>
  );
}

export default OthersProductForm;