import React = require("react");
import { Button, Col, Row, Table } from "react-bootstrap"

export interface InputDataType {
  id: number,
  type: string,
  qt: number,
  pw: number,
  use: number
}

interface Props {
  data: InputDataType[]
  dataCleaner(): any
}

export default class InputDataList extends React.Component<Props> {

  constructor(props) {
    super(props)
  }

  render() {
    if (this.props.data.length == 0) return <></>

    let dataRows = this.props.data.map((item) => {
      return <tr key={item.id}>
        <td>{item.type}</td>
        <td className="text-center">{item.qt}</td>
        <td className="text-center">{item.pw}</td>
        <td className="text-center">{item.use}</td>
      </tr>
    })

    return <>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Cantidad</th>
            <th>Potencia (W)</th>
            <th>Horas uso día</th>
          </tr>
        </thead>
        <tbody>
          {dataRows}
        </tbody>
      </Table>
      <Row>
        <Col className="d-flex justify-content-end">
          <Button
            size="sm"
            variant="danger"
            onClick={this.props.dataCleaner}
          >Limpiar tabla</Button>
        </Col>
      </Row>
    </>
  }
}