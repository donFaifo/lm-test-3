import * as React from "react"
import Main from "./components/Main";
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import { Col, Row } from "react-bootstrap";

class App extends React.Component {
  render() {
    return <>
      <Navbar variant="dark" className="customNavbar">
        <Container>
          <Navbar.Brand href="#home">Cálculos solar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Inicio</Nav.Link>
            <Nav.Link href="https://sites.google.com/leroymerlin.es/calculo-fotovoltaica/inicio" target="_blank">Ayuda</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Main />

      <Container>
        <Row className="mt-5">
          <Col className="d-flex justify-content-end">
            Made by mGuerrero using &nbsp;
            <a href="https://es.reactjs.org/" target="_blank">React</a>
            &nbsp; and &nbsp;
            <a href="https://parceljs.org/" target="_blank">ParcelJS</a>
            &nbsp; for &nbsp; 
            <a href="https://developers.google.com/apps-script" target="_blank">Google App Script</a>
          </Col>
        </Row>
      </Container>
      

    </>;
  }
}

export default App