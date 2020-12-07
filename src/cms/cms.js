import CMS, { h, createClass } from "netlify-cms-app"
import cloudinary from "netlify-cms-media-library-cloudinary"

import ProductPagePreview from "./preview-templates/ProductPagePreview"

CMS.registerMediaLibrary(cloudinary)
CMS.registerPreviewTemplate("products", ProductPagePreview)

// var ProductsControl = createClass({
//   state: [],
//   componentWillMount: function () {
//     fetch("https://api.stripe.com/v1/products", {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${process.env.GATSBY_STRIPE_SK}`,
//       },
//     })
//       .then(res => res.json())
//       .then(obj => this.setState(obj.data))
//   },

//   render: function () {
//     const value = this.props.value
//     return h(
//       "select",
//       {
//         id: this.props.forID,
//         className: this.props.classNameWrapper,
//         value: value,
//         onChange: this.handleChange,
//       },
//       this.state.map(function (option, index) {
//         return h("option", { key: index }, option)
//       })
//     )
//   },
// })

var CategoriesControl = createClass({
  handleChange: function (e) {
    const separator = this.props.field.get("separator", ", ")
    this.props.onChange(e.target.value.split(separator).map(e => e.trim()))
  },

  render: function () {
    const separator = this.props.field.get("separator", ", ")
    var value = this.props.value
    return h("input", {
      id: this.props.forID,
      className: this.props.classNameWrapper,
      type: "text",
      value: value ? value.join(separator) : "",
      onChange: this.handleChange,
    })
  },
})

CMS.registerWidget("products", CategoriesControl)
