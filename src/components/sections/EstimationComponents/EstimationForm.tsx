import React = require("react");
import { Col, Form, Row } from "react-bootstrap";
import BatteryForm from "./BatteryForm";
import ControllerForm from "./ControllerForm";
import { Article } from "./EstimationListComponents/Subsection";
import InverterForm from "./InverterForm";
import PanelForm from "./PanelForm";
import ProductForm from "./ProductForm";

interface Props {
  isHidden: boolean;
  saveBtnHandler(product: Article): void;
  pw: number;
  amph: number;
}

interface State {
  type: string
  article: Article
}

export default class EstimationForm extends React.Component<Props, State> {

  refType: any

  constructor(props) {
    super(props)

    this.state = {
      type: "Paneles",
      article: {
        type: "",
        description: "",
        ref: '',
        qt: 0,
        price: 0
      }
    }

    this.handleType = this.handleType.bind(this)
    this.save =this.save.bind(this)

    this.refType = React.createRef()
  }

  handleType(event) {
    this.setState({
      type: event.target.value
    })
  }

  save(product: Article) {
    this.refType.current.focus()
    this.props.saveBtnHandler(product)
    this.setState({
      type: "Paneles",
      article: {
        type: "",
        description: "",
        ref: '',
        qt: 0,
        price: 0
      }
    })
  }

  render() {
    if(this.props.isHidden) return <></>

    let form: JSX.Element;
    
    switch(this.state.type) {
      case "Paneles":
        form = <PanelForm pw={this.props.pw} addAction={(product) => this.save(product)}/>;
        break;
      case "Baterías":
        form = <BatteryForm amph={this.props.amph} addAction={(product) => this.save(product)}/>;
        break;
      case "Controlador":
        form = <ControllerForm pw={this.props.pw} addAction={(product) => this.save(product)}/>;
        break;
      case "Inversor":
        form = <InverterForm addAction={(product) => this.save(product)}/>;
        break;
      case "Estructura":
        form = <ProductForm
          productType="Estructura"
          productList={[
            {
              ref: '56789012',
              description: 'Estructura para paneles solares cubierta plana',
              nPanels: 1,
              price: 120
            },
            {
              ref: '56789013',
              description: 'Estructura para paneles solares cubierta inclinada',
              nPanels: 1,
              price: 120
            },
            {
              ref: '56789014',
              description: 'Estructura para paneles solares cubierta plana',
              nPanels: 2,
              price: 220
            },
            {
              ref: '56789015',
              description: 'Estructura para paneles solares cubierta inclinada',
              nPanels: 2,
              price: 220
            },
          ]}
          productParser={(structure) => {
            return {
              type: 'Estructura',
              ref: structure.ref,
              description: `${structure.description} - ${structure.nPanels} paneles`,
              price: structure.price,
              qt: 1
            }
          }}
          addAction={(product) => this.save(product)}/>;
        break;
      case 'Cableado':
        form = <ProductForm
          productType="Cableado"
          productList={[
            {
              ref: '67891234',
              description: 'Cable solar rojo',
              section: 10,
              cableLenght: 100,
              price: 100,
            },
            {
              ref: '67891235',
              description: 'Cable solar negro',
              section: 10,
              cableLenght: 100,
              price: 100,
            },
          ]}
          productParser={(product) => {
            return {
              type: 'Cableado',
              ref: product.ref,
              description: `${product.description} ${product.section}mm, ${product.cableLenght}m`,
              price: product.price,
              qt: 1
            }
          }}
          addAction={(product) => this.save(product)}
        />  
        break;
      case 'Otros':
        form = <ProductForm
          productType="Otros"
          productList={[
            {
              ref: '987654321',
              description: 'Producto de prueba',
              price: 10,
            }
          ]}
          productParser={(product) => {
            return {
              type: 'Otros',
              ref: product.ref,
              description: product.description,
              price: product.price,
              qt: 1
            }
          }}
          addAction={(product) => this.save(product)}
        />
        break;
      default:
        form = <></>
    };

    return <Row>
      <Col>
        <Form>
          <Row>
            <Col xs="12" md="4" xl="3" className="mb-4">
              <Form.Label htmlFor="type">Tipo</Form.Label>
              <Form.Select 
                id="type" 
                onChange={this.handleType} 
                value={this.state.type}
                ref={this.refType}>
                <option value="Paneles">Paneles</option>
                <option value="Baterías">Baterías</option>
                <option value="Controlador">Controlador</option>
                <option value="Inversor">Inversor</option>
                <option value="Estructura">Estructura</option>
                <option value="Cableado">Cableado</option>
                <option value="Otros">Otros</option>
              </Form.Select>
            </Col>
          </Row>
          
          {form}
          
        </Form>
      </Col>
    </Row>
  }
}