import React from "react"
import PropTypes from "prop-types"
import { ProductPageTemplate } from "../../templates/product-page-template"
const ProductPagePreview = ({ entry, widgetFor }) => {
  const gallery = entry.getIn(["data", "gallery"]).toJS()
  // const body = widgetFor("body")
  const prod_id = entry.getIn(["data", "prod_id"])
  const leather_color = entry.getIn(["data", "leather_color"]).toJS()
  console.log(leather_color)
  return (
    <div style={{ width: "80%", margin: "2rem auto" }}>
      <ProductPageTemplate id={prod_id} preview={true} gallery={gallery} />
    </div>
  )
}

ProductPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default ProductPagePreview
