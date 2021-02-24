import React from "react"
import CMS from "netlify-cms-app"
import Immutable from "immutable"

export class Control extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [],
    }
  }

  //   https://www.marcveens.nl/netlify-cms-dynamic-select-widget-values

  getProducts() {
    try {
      fetch(`https://api.stripe.com/v1/products`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.STRIPE_SK}`,
        },
      })
        .then(res => res.json())
        .then(stripe_obj => {
          const product_list = stripe_obj.data.map(product => {
            return {
              label: `${product.id} - ${product.name}`,
              value: product.id,
            }
          })
          this.setState({
            products: product_list,
          })
        })
    } catch (err) {
      console.log(err)
    }
  }

  componentDidMount() {
    this.getProducts()
  }

  render() {
    const SelectControl = CMS.getWidget("select").control
    const selectProps = { ...this.props }
    selectProps.field = selectProps.field.set(
      "options",
      Immutable.List(this.state.products)
    )
    return <SelectControl {...selectProps} />
  }
}

export const Preview = props => {
  return <div>{props.value}</div>
}
