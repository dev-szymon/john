import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import ImageGallery from "../components/imageGallery/imageGallery"
import "./product-page.css"

export const ProductPageTemplate = ({
  gallery,
  id,
  preview,
  leather_color,
  thread_color,
  name,
  prices,
}) => {
  console.log(leather_color)
  return (
    <section className="product-section">
      <div className="image-gallery">
        <ImageGallery gallery={gallery} />
      </div>
      <h2>{name}</h2>
      <div>
        <span>{`${prices[0].unit_amount / 100} ${prices[0].currency}`}</span>
        <div style={{ display: "flex" }}>
          {leather_color.map(lc => (
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
          ))}
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
    </section>
  )
}

const ProductPage = ({ data }) => {
  const { html, frontmatter, fields, gallery } = data.markdownRemark
  return (
    <Layout>
      <ProductPageTemplate
        gallery={gallery}
        prices={fields.prices}
        name={fields.name}
        leather_color={frontmatter.leather_color}
      />
    </Layout>
  )
}

export default ProductPage

export const ProductPageQuery = graphql`
  query ProductPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        template
        prod_id
        leather_color {
          name
          color
        }
      }
      fields {
        prices {
          id
          currency
          unit_amount
        }
        name
      }
    }
  }
`
