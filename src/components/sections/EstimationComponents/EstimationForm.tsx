import React = require("react");
import { Button, Col, Form, Row } from "react-bootstrap";
import { SubsectionData } from "../Estimation";
import { Article } from "./EstimationListComponents/Subsection";
import PanelForm from "./PanelForm";

interface Props {
  isHidden: boolean;
  saveBtnHandler(product: SubsectionData): void;
  pw: number;
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
        description: "",
        ref: 0,
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

  save() {
    this.refType.current.focus()
    this.props.saveBtnHandler({
      type: this.state.type,
      product: [this.state.article]
    })
    this.setState({
      type: "Paneles",
      article: {
        description: "",
        ref: 0,
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
        form = <PanelForm pw={this.props.pw} />
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
          
          <Row>
            <Col className="d-flex align-items-end mb-4" xs="2">
              <Button onClick={this.save}>Guardar</Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  }
}