import React = require("react");
import Section from "./Section";

export default class Test extends React.Component {
    render() {
        return <Section name="Test" button="Prueba">
            <p>Esto es solo una prueba</p>
            <p>Con varios elementos</p>
        </Section>
    }
}