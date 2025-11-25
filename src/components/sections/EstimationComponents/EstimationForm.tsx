import React = require("react");
import { Col, Form, Row } from "react-bootstrap";
import { BatteryData, CableData, ControllerData, InverterData, PanelData, StructureData } from "../../../../server/main";
import { Article } from "./EstimationListComponents/Subsection";
import OthersProductForm from "./OthersProductForm";
import ProductForm from "./ProductForm";
import { _batteriesList, _controllersList, _invertersList, _panelsList, _structuresList, _wiringList } from "./ProductLists";

interface Props {
  isHidden: boolean;
  saveBtnHandler(product: Article): void;
  pw: number;
  amph: number;
}

interface State {
  type: string;
  article: Article;
  panelsList: PanelData[];
  batteriesList: BatteryData[];
  controllersList: ControllerData[];
  invertersList: InverterData[];
  structuresList: StructureData[];
  wiringList: CableData[];
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
      },
      panelsList: _panelsList,
      batteriesList: _batteriesList,
      controllersList: _controllersList,
      invertersList: _invertersList,
      structuresList: _structuresList,
      wiringList: _wiringList,
    }

    this.handleType = this.handleType.bind(this)
    this.save =this.save.bind(this)

    this.refType = React.createRef()
  }

  componentDidMount(): void {
    //@ts-ignore
    google.script.run.withSuccessHandler((data: PanelData[]) => {
      this.setState({panelsList: data});
    }).getPanelsData();

    //@ts-ignore
    google.script.run.withSuccessHandler((data: BatteryData[]) => {
      this.setState({batteriesList: data});
    }).getBatteriesData();
    
    //@ts-ignore
    google.script.run.withSuccessHandler((data: ControllerData[]) => {
      this.setState({controllersList: data});
    }).getControllersData();
    
    //@ts-ignore
    google.script.run.withSuccessHandler((data: InverterData[]) => {
      this.setState({invertersList: data});
    }).getInverterData();
    
    //@ts-ignore
    google.script.run.withSuccessHandler((data: StructureData[]) => {
      this.setState({structuresList: data});
    }).getStructuresData();
    
    //@ts-ignore
    google.script.run.withSuccessHandler((data: CableData[]) => {
      this.setState({wiringList: data});
    }).getCablesData();
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
          productList={this.state.panelsList}
          productParser={(panel) => {
            const n = Math.ceil(this.props.pw / panel.power);
            return {
              ref: panel.ref,
              type: 'Paneles',
              description: `[${panel.power}W ${panel.voltage}V] ${panel.description}`,
              price: panel.price,
              qt: n,
            }
          }}
          addAction={(product) => this.save(product)}/>;
        break;
      case "Baterías":
        form = <ProductForm 
          productType="Baterías"
          productList={this.state.batteriesList}
          productParser={(battery) => {
            const n = Math.ceil(this.props.amph / battery.capacity);
            return {
              ref: battery.ref,
              type: "Baterías",
              description: `[${battery.capacity}Ah ${battery.voltage}V] ${battery.description}`,
              price: battery.price,
              qt: n,
            }
          }}
          addAction={(product) => this.save(product)}/>;
        break;
      case "Controlador":
        form = <ProductForm 
          productList={this.state.controllersList}
          productType="Controlador"
          productParser={(controller) => {
            return {
              type: 'Controlador',
              ref: controller.ref,
              description: `[${controller.amperage}A ${controller.voltage}V] ${controller.description}`,
              price: controller.price,
              qt: 1
            }
          }}
          addAction={(product) => this.save(product)}/>;
        break;
      case "Inversor":
        form = <ProductForm
          productType="Inversor"
          productList={this.state.invertersList}
          productParser={(inverter) => {
            return {
              ref: inverter.ref,
              type: "Inversor",
              description: `[${inverter.power}W ${inverter.amperage}A ${inverter.voltage}V] ${inverter.description}`,
              price: inverter.price,
              qt: 1,
            }
          }}
          addAction={(product) => this.save(product)}/>;
        break;
      case "Estructura":
        form = <ProductForm
          productType="Estructura"
          productList={this.state.structuresList}
          productParser={(structure) => {
            return {
              type: 'Estructura',
              ref: structure.ref,
              description: `[${structure.nPanels} paneles] ${structure.description}`,
              price: structure.price,
              qt: 1
            }
          }}
          addAction={(product) => this.save(product)}/>;
        break;
      case 'Cableado':
        form = <ProductForm
          productType="Cableado"
          productList={this.state.wiringList}
          productParser={(product) => {
            return {
              type: 'Cableado',
              ref: product.ref,
              description: `[${product.section}mm, ${product.length}m] ${product.description}`,
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