import React = require("react");
import Section from "./Section";
import InputDataForm from "./InputDataComponents/InputDataForm";
import InputDataList from "./InputDataComponents/InputDataList";
import { InputDataType } from "./InputDataComponents/InputDataList";

interface Props {
  data: InputDataType[]
  dataHandler(record: InputDataType): any
  dataCleaner(): any
}

interface States {
  inputHidden: boolean
}

class InputData extends React.Component<Props, States> {
  constructor(props) {
    super(props);
    this.state = {
      inputHidden: true,
    };

    this.handleInputForm = this.handleInputForm.bind(this);
  }

  handleInputForm() {
    this.setState({
      inputHidden: !this.state.inputHidden,
    });
  }

  render() {
    return (
      <Section
        name="Datos de consumo"
        button="Añadir consumo"
        btnHandler={this.handleInputForm}
      >
        <InputDataForm
          hidden={this.state.inputHidden}
          saveHandler={this.props.dataHandler}
          lastId={this.getLastId(this.props.data)}
        />
        <InputDataList
          data={this.props.data}
          dataCleaner={this.props.dataCleaner}
        />
      </Section>
    );
  }

  getLastId(data: InputDataType[]): number {
    if (data.length == 0) return 0;

    let lastElement = data.length - 1;

    return data[lastElement].id;
  }
}

export default InputData;
