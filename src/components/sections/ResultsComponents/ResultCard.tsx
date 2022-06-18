import React = require("react")
import Card from "react-bootstrap/Card"

interface Props {
  color: string,
  header: string,
  children: string[] | string
}

class ResultCard extends React.Component<Props> {
  render() {
    return <Card bg={this.props.color} text="white">
      <Card.Header>{this.props.header}</Card.Header>
      <Card.Body className="bg-light text-dark">
        <Card.Text className="text-end h4">{this.props.children}</Card.Text>
      </Card.Body>
    </Card>
  }
}

export default ResultCard