import React = require("react");
import Subsection, { Article } from "./EstimationListComponents/Subsection";

interface Props {
  products: Article[];
}

export interface SubsectionList {
  type: string;
  products: Article[];
}

export default class EstimationList extends React.Component<Props> {
  constructor(props) {
    super(props)
  }

  render() {
    let subsections: SubsectionList[] = [];
    let list: JSX.Element[] = [];

    this.props.products.forEach(product => {
      let id = subsections.findIndex(item => item.type == product.type);
      if (id != -1) {
        subsections[id].products.push(product);
      } else {
        subsections.push({type: product.type, products: [product]})
      }
    });

    if(subsections.length > 0) {
      subsections.forEach((subsection, id) => {
        list.push(
          <Subsection
            key={id}
            title={subsection.type}
            products={subsection.products}
          />
        )
      });
    }

    return <>{list}</>;
  }
}