import React = require("react");
import { Button, Col, Form, Row } from "react-bootstrap";
import { Article } from "./EstimationListComponents/Subsection";

interface Props {
  productType: string;
  productList: any[];
  productParser(product: any): Article;
  addAction(product: Article): void;
}

const thisType = 'Inversor';

const ProductForm = (props: Props) => {
  const [qt, setQt] = React.useState<number>(0);
  const [price, setPrice] = React.useState<number>(0);
  const [product, setProduct] = React.useState<Article>({
    ref: '',
    type: thisType,
    description: '',
    price: 0,
    qt: 0,
  });

  React.useEffect(() => {

    setProduct(props.productParser(props.productList[0]));

    setPrice(props.productParser(props.productList[0]).price);

    setQt(1);

  }, []);

  const list = props.productList.length > 0 ? props.productList.map((item, id) => {
    let product = props.productParser(item);
    return (
      <option value={product.ref} key={id}>
        {product.description}
      </option>
    );
  }) : <></>;

  return (
    <Row>
      <Col className="mb-3 col-xs-12 col-md-6 col-xl-6">
        <Form.Label htmlFor="product">Inversor</Form.Label>
        <Form.Select id="product" onChange={element => {
          const item = props.productList.find((item) => item.ref == element.target.value);
          setQt(1);
          setPrice(item.price);
          setProduct(props.productParser(item));
        }}>
          {list}
        </Form.Select>
      </Col>
      <Col>
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
      <Col>
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
          <Button className="mt-3" onClick={(ev) => props.addAction(product)}>Añadir</Button>
      </Col>
    </Row>
  );
}

export default ProductForm;