import React from "react"

export const ProductPageTemplate = ({
  gallery,
  id,
  preview,
  leather_color,
  thread_color,
  product,
  prices,
}) => {
  console.log(leather_color)
  return (
    <section>
      {product && prices ? (
        <>
          {gallery.map(image => (
            <img
              style={{ position: "relative", width: "100%" }}
              src={image}
              alt={id}
            />
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
            <div style={{ display: "flex" }}>
              {/* {leather_color.map(lc => (
                <div>
                  <div
                    style={{
                      backgroundColor: lc.color,
                      padding: "0.1rem",
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <input
                      style={{ margin: "0" }}
                      type="radio"
                      name={id}
                      id={lc.name}
                      value={lc.name}
                    ></input>
                  </div>
                  <label htmlFor={lc.name}>{lc.name}</label>
                </div>
              ))} */}
            </div>
            <div>
              <input
                type="number"
                defaultValue={1}
                style={{ width: "48px" }}
              ></input>
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
