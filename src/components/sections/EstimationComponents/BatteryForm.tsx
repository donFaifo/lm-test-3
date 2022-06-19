import React = require("react");
import { Button, Col, Form, Row } from "react-bootstrap";
import { Article } from "./EstimationListComponents/Subsection";

interface BatteryObject {
  ref: string;
  description: string;
  amph: number;
  voltage: number;
  price: number;
};

interface Props {
  amph: number;
  addAction(product: Article): void;
}

const thisType = 'Baterías';

function parsePanelObject(batteryObject: BatteryObject, n: number): Article {
  return {
    ref: batteryObject.ref,
    type: thisType,
    description: `${batteryObject.amph}Ah ${batteryObject.voltage}V - ${batteryObject.description}`,
    price: batteryObject.price,
    qt: n,
  }
}

const BatteryForm = (props: Props) => {
  const [qt, setQt] = React.useState<number>(0);
  const [price, setPrice] = React.useState<number>(0);
  const [batteriesList, setBatteriesList] = React.useState<BatteryObject[]>([]);
  const [product, setProduct] = React.useState<Article>({
    ref: '',
    type: thisType,
    description: '',
    price: 0,
    qt: 0,
  });

  React.useEffect(() => {
    setBatteriesList(
      [
        {
          ref: '23456789',
          description: 'Batería AGM',
          amph: 60,
          voltage: 12,
          price: 70,
        },
        {
          ref: '23456790',
          description: 'Batería GEL',
          amph: 80,
          voltage: 12,
          price: 90,
        },
        {
          ref: '23456791',
          description: 'Batería AGM',
          amph: 100,
          voltage: 24,
          price: 100,
        },
        {
          ref: '23456792',
          description: 'Batería GEL',
          amph: 120,
          voltage: 24,
          price: 110,
        },
        {
          ref: '23456793',
          description: 'Batería AGM',
          amph: 450,
          voltage: 48,
          price: 179,
        },
      ]
    );

    setProduct(parsePanelObject({
      ref: '23456789',
      description: 'Batería AGM',
      amph: 60,
      voltage: 12,
      price: 70,
    }, Math.ceil(props.amph / 60)));

    setPrice(70);

    setQt(Math.ceil(props.amph / 60));

  }, []);

  const list = batteriesList.length > 0 ? batteriesList.map((item, id) => {
    return (
      <option value={item.ref} key={id}>
        {`Batería ${item.amph}Ah, ${item.voltage}V - ${item.description}`}
      </option>
    );
  }) : <></>;

  return (
    <Row>
      <Col className="mb-3 col-12 col-md-6 col-xl-6">
        <Form.Label htmlFor="panel">Batería</Form.Label>
        <Form.Select id="panel" onChange={element => {
          const item = batteriesList.find((item) => item.ref == element.target.value);
          let nBatteries = Math.ceil(props.amph / item.amph);
          setQt(nBatteries);
          setPrice(item.price);
          setProduct(parsePanelObject(item, nBatteries));
        }}>
          {list}
        </Form.Select>
      </Col>
      <Col className="mb-3 col-6 col-xl-3">
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
      <Col className="mb-3 col-6 col-xl-3">
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
      <Col className="d-flex align-items-center mb-3 col-12 col-md-6 col-xl-3">
          <Button className="mt-3" onClick={(ev) => props.addAction(product)}>Añadir</Button>
      </Col>
    </Row>
  );
}

export default BatteryForm;