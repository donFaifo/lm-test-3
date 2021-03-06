import React = require("react");
import { Button, Col, Form, Row } from "react-bootstrap";
import { InputDataType } from "./InputDataList";

interface State {
  type: string;
  qt: number;
  pw: number;
  use: number;
}

interface Props {
  hidden: boolean;
  saveHandler(record: InputDataType): any;
  lastId: number;
}

export default class InputDataForm extends React.Component<Props, State> {

  selectTypeRef: any

  constructor(props) {
    super(props);
    this.state = {
      type: "Indefinido",
      qt: 0,
      pw: 0,
      use: 0,
    };
    this.save = this.save.bind(this);
    this.handleType = this.handleType.bind(this)
    this.handleQt = this.handleQt.bind(this)
    this.handlePw = this.handlePw.bind(this)
    this.handleUse = this.handleUse.bind(this)
    this.resetForm = this.resetForm.bind(this)

    this.selectTypeRef = React.createRef()
  }

  handleType(event) {
    this.setState({ type: event.target.value })
  }
  handleQt(event) {
    this.setState({ qt: event.target.value })
  }
  handlePw(event) {
    this.setState({ pw: event.target.value })
  }
  handleUse(event) {
    this.setState({ use: event.target.value })
  }

  save() {
    this.resetForm()
    this.selectTypeRef.current.focus()
    this.props.saveHandler({
      id: this.props.lastId + 1,
      qt: this.state.qt,
      type: this.state.type,
      pw: this.state.pw,
      use: this.state.use
    });
  }

  resetForm() {
    this.setState({
      type: "Indefinido",
      qt: 0,
      pw: 0,
      use: 0,
    })
  }

  render() {
    if (this.props.hidden) {
      return <></>;
    }
    return (
      <Row>
        <Form>
          <Row>
            <Col sm="12" md="6" xxl="4" className="mb-3">
              <Form.Label htmlFor="type">Tipo</Form.Label>
              <Form.Select id="type"
                onChange={this.handleType}
                value={this.state.type}
                ref={this.selectTypeRef}
              >
                <option value={this.state.type}>{this.state.type}</option>
                <option value="Motor">Motor</option>
                <option value="Iluminaci??n">Iluminaci??n</option>
                <option value="Electr??nico">Aparato electr??nico</option>
              </Form.Select>
            </Col>
            <Col sm="12" xxl="3" md="5" className="mb-3">
              <Form.Label htmlFor="pw">Potencia (W)</Form.Label>
              <Form.Control
                id="pw"
                type="number"
                placeholder="W (vatios)"
                onChange={this.handlePw}
                value={this.state.pw}
                onClick={(event) => {
                  event.currentTarget.select();
                }}
                onKeyUp={(event) => {
                  if(event.key == 'Enter') this.save();
                }}
              ></Form.Control>
            </Col>
            <Col sm="12" md="6" xxl="2" className="mb-3">
              <Form.Label htmlFor="qt">Cantidad</Form.Label>
              <Form.Control
                id="qt"
                type="number"
                placeholder="n?? elementos"
                onChange={this.handleQt}
                value={this.state.qt}
                onClick={(event) => {
                  event.currentTarget.select();
                }}
                onKeyUp={(event) => {
                  if(event.key == 'Enter') this.save();
                }}
              ></Form.Control>
            </Col>
            <Col sm="12" xxl="2" md="5" className="mb-3">
              <Form.Label htmlFor="use">Horas de uso</Form.Label>
              <Form.Control
                id="use"
                type="number"
                placeholder="uso medio al d??a"
                onChange={this.handleUse}
                value={this.state.use}
                onClick={(event) => {
                  event.currentTarget.select();
                }}
                onKeyUp={(event) => {
                  if(event.key == 'Enter') this.save();
                }}
              ></Form.Control>
            </Col>
            <Col sm="12" xxl="1" md="2" className="mb-3 d-flex align-items-end">
              <Button id="btnSave" variant="success" onClick={this.save}>Guardar</Button>
            </Col>
          </Row>
        </Form>
      </Row>
    );
  }
}
