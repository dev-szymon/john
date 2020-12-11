import React, { useEffect, useState } from "react"

export const ProductPageTemplate = ({
  gallery,
  id,
  preview,
  leather_color,
  thread_color,
}) => {
  const [product, setProduct] = useState()
  const [prices, setPrices] = useState()
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

    fetch(`https://api.stripe.com/v1/prices?product=${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GATSBY_STRIPE_SK}`,
      },
    })
      .then(res => res.json())
      .then(({ data }) => setPrices(data))
  }, [preview, id])
  return (
    <section>
      {product && prices ? (
        <>
          {gallery.map(image => (
            <img style={{ position: "relative", width: "100%" }} src={image} />
          ))}
          <h2>{product.name}</h2>
          <div>
            <h5>
              {prices.map(p =>
                p.currency !== "pln"
                  ? null
                  : p.metadata?.promotion
                  ? null
                  : p.unit_amount / 100
              )}
            </h5>
            <div>
              {leather_color.map(lc => (
                <div>
                  <input
                    type="radio"
                    name={id}
                    id={lc.name}
                    value={lc.name}
                  ></input>
                  <label htmlFor={lc.name}>{lc.name}</label>
                </div>
              ))}
            </div>
            <div>
              <input type="number" defaultValue={1}></input>
              <button>add to cart</button>
            </div>
          </div>
        </>
      ) : (
        <p>loading...</p>
      )}
    </section>
  )
}
