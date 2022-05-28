import React = require("react");
import Section from "../Section";
import InputDataList from "./InputDataList";
import {InputDataType} from "./InputDataList"

interface Props {
  data: InputDataType[]
}

class InputData extends React.Component<Props> {
  
  render() {

    return <Section name="Datos de consumo" button="Añadir consumo">
      <InputDataList data={this.props.data}/>
    </Section>
  }
}

export default InputData