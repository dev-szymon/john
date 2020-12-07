import React from "react"
import PropTypes from "prop-types"
import { ProductPageTemplate } from "../../templates/product-page-template"
const ProductPagePreview = ({ entry, widgetFor }) => {
  // const title = entry.getIn(["data", "title"])
  // const body = widgetFor("body")
  const prod_id = entry.getIn(["data", "prod_id"])
  return (
    <div style={{ width: "80%", margin: "2rem auto" }}>
      <ProductPageTemplate id={prod_id} />
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
