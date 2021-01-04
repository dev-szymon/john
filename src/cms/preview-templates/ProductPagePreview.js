import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { ProductPageTemplate } from "../../templates/product-page-template"

const ProductPagePreview = ({ entry, widgetFor }) => {
  const gallery = [...entry.getIn(["data", "gallery"])]
  // const body = widgetFor("body")
  const prod_id = entry.getIn(["data", "prod_id"])
  const leather_color = entry.getIn(["data", "leather_color"])

  const [product, setProduct] = useState()
  const [prices, setPrices] = useState()

  useEffect(() => {
    if (prod_id) {
      fetch(`https://api.stripe.com/v1/products/${prod_id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GATSBY_STRIPE_SK}`,
        },
      })
        .then(res => res.json())
        .then(stripe_obj => setProduct(stripe_obj))

      fetch(`https://api.stripe.com/v1/prices?product=${prod_id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GATSBY_STRIPE_SK}`,
        },
      })
        .then(res => res.json())
        .then(({ data }) => setPrices(data))
    }
  }, [prod_id])

  return (
    <div style={{ width: "80%", margin: "2rem auto" }}>
      {product && prices ? (
        <ProductPageTemplate
          id={prod_id}
          preview={true}
          leather_color={leather_color}
          gallery={gallery}
          prices={prices}
          name={product.name}
        />
      ) : (
        <p>loading...</p>
      )}
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
