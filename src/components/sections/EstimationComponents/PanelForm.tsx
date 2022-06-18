import React = require("react");
import { Col, Form, Row } from "react-bootstrap";

interface panelObject {
  ref: string;
  description: string;
  power: number;
  voltage: number;
  price: number;
};

const solarPanels: panelObject[] = [
  {
    ref: '12345678',
    description: 'Xunzel Monocristalino 60x60',
    power: 60,
    voltage: 12,
    price: 70,
  },
  {
    ref: '12345679',
    description: 'Xunzel monocristalino 60x90',
    power: 80,
    voltage: 12,
    price: 90,
  },
  {
    ref: '12345680',
    description: 'Xunzel monocristalino 60x100',
    power: 100,
    voltage: 24,
    price: 100,
  },
  {
    ref: '12345681',
    description: 'Xunzel monocristalino 120x80',
    power: 120,
    voltage: 24,
    price: 110,
  },
  {
    ref: '12345682',
    description: 'Risen monocristalino 203x110',
    power: 450,
    voltage: 48,
    price: 179,
  },
];

interface Props {
  pw: number;
}

const PanelForm = (props: Props) => {
  const [qt, setQt] = React.useState<number>(0);
  const [price, setPrice] = React.useState<number>(0);

  const list = solarPanels.map((item, id) => {
    return (
      <option value={item.ref} key={id}>
        {`Panel ${item.power}W, ${item.voltage}V - ${item.description}`}
      </option>
    );
  });

  return (
    <Row>
      <Col className="mb-3 col-xs-12 col-md-6 col-xl-9">
        <Form.Label htmlFor="panel">Panel</Form.Label>
        <Form.Select id="panel" onChange={element => {
          const n = calculatePanels(props.pw, element.target.value);
          setQt(n);
          setPrice(getPrice(element.target.value));
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
        />
      </Col>
      <Col>
        <Form.Label htmlFor="price">Precio unitario</Form.Label>
        <Form.Control 
          id="price"
          placeholder="Precio €"
          type="number"
          value={price}
        />
      </Col>
    </Row>
  );
}

function calculatePanels(pw: number, ref: string) {
  const item = solarPanels.find((it) => it.ref == ref);
  let nPanels = pw / item.power;
  return Math.ceil(nPanels);
}

function getPrice(ref: string) {
  const item = solarPanels.find((it) => it.ref == ref);
  return item.price;
}

export default PanelForm;