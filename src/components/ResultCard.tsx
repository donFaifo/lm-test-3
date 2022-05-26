import React = require("react")
import Card from "react-bootstrap/Card"

interface Props {
  header: string,
  children: string[] | string
}

class ResultCard extends React.Component<Props> {
  render() {
    return <Card>
      <Card.Header>{this.props.header}</Card.Header>
      <Card.Body>
        <Card.Text>{this.props.children}</Card.Text>
      </Card.Body>
    </Card>
  }
}

export default ResultCard