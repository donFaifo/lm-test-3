import React = require("react");
import Section from "../Section";
import InputDataForm from "./InputDataForm";
import InputDataList from "./InputDataList";
import {InputDataType} from "./InputDataList"

interface Props {
  data: InputDataType[]
  dataHandler(record: InputDataType): any
}

interface States {
  inputHidden: boolean
}

class InputData extends React.Component<Props, States> {
  constructor(props) {
    super(props)
    this.state = {
      inputHidden: true
    }

    this.handleInputForm = this.handleInputForm.bind(this)
  }

  handleInputForm() {
    this.setState({
      inputHidden: !this.state.inputHidden
    })
  }
  
  render() {

    return <Section name="Datos de consumo" button="Añadir consumo" btnHandler={this.handleInputForm}>
      <InputDataForm hidden={this.state.inputHidden} saveHandler={this.props.dataHandler}/>
      <InputDataList data={this.props.data}/>
    </Section>
  }
}

export default InputData