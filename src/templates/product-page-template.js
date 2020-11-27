import React, { useEffect } from "react"

export const ProductPageTemplate = ({ id, preview }) => {
  useEffect(() => {
    if (preview) {
      fetch("https://api.stripe.com/v1/products", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GATSBY_STRIPE_SK}`,
        },
      })
        .then(res => res.json())
        .then(data => console.log(data))
    }
  })
  return (
    <section>
      <h1>{id}</h1>
    </section>
  )
}
