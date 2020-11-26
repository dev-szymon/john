import React from "react"
import PropTypes from "prop-types"

const ProductPagePreview = ({ entry, widgetFor }) => {
  const title = entry.getIn(["data", "title"])
  const body = widgetFor("body")
  const prod_id = entry.getIn(["data", "prod_id"])
  return (
    <div style={{ width: "80%", margin: "2rem auto" }}>
      <h1>{prod_id}</h1>
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
