import React = require("react");
import { Button, Col, Form, Row } from "react-bootstrap";
import { Article } from "./EstimationListComponents/Subsection";

interface Props {
  productType: string;
  productList: any[];
  productParser(product: any): Article;
  addAction(product: Article): void;
}

const ProductForm = (props: Props) => {
  const [qt, setQt] = React.useState<number>(0);
  const [price, setPrice] = React.useState<number>(0);
  const [product, setProduct] = React.useState<Article>({
    ref: '',
    type: '',
    description: '',
    price: 0,
    qt: 0,
  });

  React.useEffect(() => {

    if(props.productList.length > 0) {
      setProduct(props.productParser(props.productList[0]));
      setPrice(props.productParser(props.productList[0]).price);
      setQt(props.productParser(props.productList[0]).qt);
    }

  }, [props.productList]);

  const list = props.productList.length > 0 ? props.productList.map((item, id) => {
    let product = props.productParser(item);
    return (
      <option value={product.ref} key={id}>
        {product.description}
      </option>
    );
  }) : <></>;

  return (
    <Row className="mb-3">
      <Col className="mb-3 col-12 col-lg-6">
        <Form.Label htmlFor="product">{props.productType}</Form.Label>
        <Form.Select id="product" onChange={element => {
          const item = props.productList.find((item) => item.ref == element.target.value);
          setQt(props.productParser(item).qt);
          setPrice(item.price);
          setProduct(props.productParser(item));
        }}>
          {list}
        </Form.Select>
      </Col>
      <Col className="mb-3 col-12 col-md-5 col-lg-3 col-xl-2">
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
      <Col className="mb-3 col-12 col-md-5 col-lg-3 col-xl-2">
        <Form.Label htmlFor="price">Precio unitario</Form.Label>
        <Form.Control 
          id="price"
          placeholder="Precio ???"
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
          <Button variant="success" className="mt-3" onClick={(ev) => props.addAction(product)}>A??adir</Button>
      </Col>
    </Row>
  );
}

export default ProductForm;