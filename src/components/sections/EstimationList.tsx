import React = require("react");
import Section from "../Section";

export default class EstimationList extends React.Component {
  render() {
    return <Section name="Presupuesto" button="Añadir línea">
      <p>Aquí el presupuesto</p>
    </Section>
  }
}