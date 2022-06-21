import React = require("react");
import { Button, Col, Form, Row } from "react-bootstrap";
import { Article } from "./EstimationListComponents/Subsection";

interface PanelObject {
  ref: string;
  description: string;
  power: number;
  voltage: number;
  price: number;
};

interface Props {
  pw: number;
  addAction(product: Article): void;
}

const thisType = 'Paneles';

function parsePanelObject(panelObject: PanelObject, n: number): Article {
  return {
    ref: panelObject.ref,
    type: thisType,
    description: `${panelObject.power}W ${panelObject.voltage}V - ${panelObject.description}`,
    price: panelObject.price,
    qt: n,
  }
}

const PanelForm = (props: Props) => {
  const [qt, setQt] = React.useState<number>(0);
  const [price, setPrice] = React.useState<number>(0);
  const [solarPanelsList, setSolarPanelsList] = React.useState<PanelObject[]>([]);
  const [product, setProduct] = React.useState<Article>({
    ref: '',
    type: thisType,
    description: '',
    price: 0,
    qt: 0,
  });

  React.useEffect(() => {
    setSolarPanelsList(
      [
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
      ]
    );

    setProduct(parsePanelObject({
      ref: '12345678',
      description: 'Xunzel Monocristalino 60x60',
      power: 60,
      voltage: 12,
      price: 70,
    }, Math.ceil(props.pw / 60)));

    setPrice(70);

    setQt(Math.ceil(props.pw / 60));

  }, []);

  const list = solarPanelsList.length > 0 ? solarPanelsList.map((item, id) => {
    return (
      <option value={item.ref} key={id}>
        {`Panel ${item.power}W, ${item.voltage}V - ${item.description}`}
      </option>
    );
  }) : <></>;

  return (
    <Row>
      <Col className="mb-3 col-12 col-md-6 col-xl-6">
        <Form.Label htmlFor="panel">Panel</Form.Label>
        <Form.Select id="panel" onChange={element => {
          const item = solarPanelsList.find((item) => item.ref == element.target.value);
          let nPanels = Math.ceil(props.pw / item.power);
          setQt(nPanels);
          setPrice(item.price);
          setProduct(parsePanelObject(item, nPanels));
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

export default PanelForm;