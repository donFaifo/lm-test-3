import React = require("react");
import { Col, Form, Row } from "react-bootstrap";
import { Article } from "./EstimationListComponents/Subsection";
import OthersProductForm from "./OthersProductForm";
import ProductForm from "./ProductForm";
import { batteriesList, controllersList, invertersList, panelsList, structuresList, wiringList } from "./ProductLists";

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
        form = <ProductForm 
          productType="Paneles"
          productList={panelsList}
          productParser={(panel) => {
            const n = Math.ceil(this.props.pw / panel.power);
            return {
              ref: panel.ref,
              type: 'Paneles',
              description: `${panel.description} ${panel.power}W ${panel.voltage}V`,
              price: panel.price,
              qt: n,
            }
          }}
          addAction={(product) => this.save(product)}/>;
        break;
      case "Baterías":
        form = <ProductForm 
          productType="Baterías"
          productList={batteriesList}
          productParser={(battery) => {
            const n = Math.ceil(this.props.amph / battery.amph);
            return {
              ref: battery.ref,
              type: "Baterías",
              description: `${battery.description} ${battery.amph}Ah ${battery.voltage}V`,
              price: battery.price,
              qt: n,
            }
          }}
          addAction={(product) => this.save(product)}/>;
        break;
      case "Controlador":
        form = <ProductForm 
          productList={controllersList}
          productType="Controlador"
          productParser={(controller) => {
            return {
              type: 'Controlador',
              ref: controller.ref,
              description: `${controller.description} - ${controller.amp}A ${controller.voltage}V`,
              price: controller.price,
              qt: 1
            }
          }}
          addAction={(product) => this.save(product)}/>;
        break;
      case "Inversor":
        form = <ProductForm
          productType="Inversor"
          productList={invertersList}
          productParser={(inverter) => {
            return {
              ref: inverter.ref,
              type: "Inversor",
              description: `${inverter.description} ${inverter.amp}A ${inverter.voltage}V`,
              price: inverter.price,
              qt: 1,
            }
          }}
          addAction={(product) => this.save(product)}/>;
        break;
      case "Estructura":
        form = <ProductForm
          productType="Estructura"
          productList={structuresList}
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
          productList={wiringList}
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
        form = <OthersProductForm addAction={(product) => this.save(product)}/>
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