import React = require("react");
import { Button, Col, Form, Row } from "react-bootstrap";
import { Article } from "./EstimationListComponents/Subsection";

interface ControllerObject {
  ref: string;
  description: string;
  amp: number;
  voltage: number;
  price: number;
};

interface Props {
  pw: number
  addAction(product: Article): void;
}

const thisType = 'Controlador';

function parsePanelObject(controllerObject: ControllerObject, n: number): Article {
  return {
    ref: controllerObject.ref,
    type: thisType,
    description: `${controllerObject.amp}A ${controllerObject.voltage}V - ${controllerObject.description}`,
    price: controllerObject.price,
    qt: n,
  }
}

const ControllerForm = (props: Props) => {
  const [qt, setQt] = React.useState<number>(0);
  const [price, setPrice] = React.useState<number>(0);
  const [controllerList, setControllerList] = React.useState<ControllerObject[]>([]);
  const [product, setProduct] = React.useState<Article>({
    ref: '',
    type: thisType,
    description: '',
    price: 0,
    qt: 0,
  });

  React.useEffect(() => {
    setControllerList(
      [
        {
          ref: '34567890',
          description: 'Controlador de carga con USB',
          amp: 5,
          voltage: 12,
          price: 24.95,
        },
        {
          ref: '34567891',
          description: 'Controlador de carga 2 entradas con USB',
          amp: 20,
          voltage: 24,
          price: 39.95,
        },
      ]
    );

    setProduct(parsePanelObject({
      ref: '34567890',
      description: 'Controlador de carga con USB',
      amp: 5,
      voltage: 12,
      price: 24.95,
    }, props.pw < 60 ? 1 : 0));

    setPrice(24.95);

    setQt(props.pw < 60 ? 1 : 0);

  }, []);

  const list = controllerList.length > 0 ? controllerList.map((item, id) => {
    return (
      <option value={item.ref} key={id}>
        {`Controlador ${item.amp}A, ${item.voltage}V - ${item.description}`}
      </option>
    );
  }) : <></>;

  return (
    <Row>
      <Col className="mb-3 col-xs-12 col-md-6 col-xl-6">
        <Form.Label htmlFor="controller">Batería</Form.Label>
        <Form.Select id="controller" onChange={element => {
          const item = controllerList.find((item) => item.ref == element.target.value);
          let nControllers = props.pw < 60 ? 1 : 0;
          setQt(nControllers);
          setPrice(item.price);
          setProduct(parsePanelObject(item, nControllers));
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

export default ControllerForm;