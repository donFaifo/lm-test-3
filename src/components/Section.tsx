import React = require("react")
import { Button, Card, Col, Row } from "react-bootstrap"

interface Props {
    children: any,
    name: string,
    button?: string
    btnHandler(): any
}

export default class Section extends React.Component<Props> {
    render() {
        let button: JSX.Element

        if (this.props.button != null) {
            button = <Button size="sm" onClick={this.props.btnHandler}>{this.props.button}</Button>
        }
        
        return <Row className="mt-3">
        <Col>
          <Card border="dark">
            <Card.Header as="h6" className="">
              <div className="d-flex">
                <div className="flex-grow-1 pt-1">{this.props.name}</div>
                <div className="">
                  {button}
                </div>
              </div>
  
            </Card.Header>
            <Card.Body>
              {this.props.children}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    }
}