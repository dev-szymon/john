import React, { useEffect, useState } from "react"

export const ProductPageTemplate = ({ gallery, id, preview }) => {
  const [product, setProduct] = useState()
  useEffect(() => {
    if (preview && id) {
      fetch(`https://api.stripe.com/v1/products/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GATSBY_STRIPE_SK}`,
        },
      })
        .then(res => res.json())
        .then(stripe_obj => setProduct(stripe_obj) && console.log(stripe_obj))
    }
  }, [preview, id])
  return (
    <section>
      {product ? (
        <>
          <h2>{product.name}</h2>
        </>
      ) : (
        <p>loading...</p>
      )}
    </section>
  )
}
