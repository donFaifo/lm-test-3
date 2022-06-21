import React = require("react");
import { Button, Col, Form, Row } from "react-bootstrap";
import { Article } from "./EstimationListComponents/Subsection";

interface InverterObject {
  ref: string;
  description: string;
  amp: number;
  pw: number;
  voltage: number;
  price: number;
};

interface Props {
  addAction(product: Article): void;
}

const thisType = 'Inversor';

function parsePanelObject(inverterObject: InverterObject, n: number): Article {
  return {
    ref: inverterObject.ref,
    type: thisType,
    description: `${inverterObject.amp}A ${inverterObject.voltage}V - ${inverterObject.description}`,
    price: inverterObject.price,
    qt: n,
  }
}

const InverterForm = (props: Props) => {
  const [qt, setQt] = React.useState<number>(0);
  const [price, setPrice] = React.useState<number>(0);
  const [inverterList, setInverterList] = React.useState<InverterObject[]>([]);
  const [product, setProduct] = React.useState<Article>({
    ref: '',
    type: thisType,
    description: '',
    price: 0,
    qt: 0,
  });

  React.useEffect(() => {
    setInverterList(
      [
        {
          ref: '45678901',
          description: 'Inversor Xunzel 24x32',
          amp: 5,
          pw: 500,
          voltage: 12,
          price: 24.95,
        },
        {
          ref: '45678902',
          description: 'Inversor Xunzel 32x38',
          amp: 20,
          pw: 750,
          voltage: 24,
          price: 39.95,
        },
        {
          ref: '45678903',
          description: 'Inversor MasterBattery 42x58',
          amp: 20,
          pw: 3000,
          voltage: 48,
          price: 189.90,
        }
      ]
    );

    setProduct(parsePanelObject({
      ref: '45678901',
      description: 'Inversor Xunzel 24x32',
      amp: 5,
      pw: 500,
      voltage: 12,
      price: 24.95,
    }, 1));

    setPrice(24.95);

    setQt(1);

  }, []);

  const list = inverterList.length > 0 ? inverterList.map((item, id) => {
    return (
      <option value={item.ref} key={id}>
        {`Inversor ${item.amp}A, ${item.voltage}V - ${item.description}`}
      </option>
    );
  }) : <></>;

  return (
    <Row>
      <Col className="mb-3 col-xs-12 col-md-6 col-xl-6">
        <Form.Label htmlFor="inverter">Inversor</Form.Label>
        <Form.Select id="inverter" onChange={element => {
          const item = inverterList.find((item) => item.ref == element.target.value);
          setQt(1);
          setPrice(item.price);
          setProduct(parsePanelObject(item, 1));
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

export default InverterForm;