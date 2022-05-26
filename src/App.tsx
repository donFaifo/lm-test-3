import * as React from "react"
import Main from "./components/Main";
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"

class App extends React.Component {
    render() {
        return <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Cálculos solar</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Inicio</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <Main />
        </>;
    }
}

export default App