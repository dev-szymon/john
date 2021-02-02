import React, { useReducer } from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import ImageGallery from "../components/imageGallery/imageGallery"
import "./product-page.css"
import { useDispatchCart } from "../context/cartContext"
import Content, { HTMLContent } from "../components/Content"
import { createCartItem } from "../utils/index"
import VariantsInput from "../components/variantsInput/variantsInput"

export const ProductPageTemplate = ({
  content,
  contentComponent,
  gallery,
  name,
  prices,
  children,
}) => {
  const PostContent = contentComponent || Content
  return (
    <section className="product-section">
      <div className="image-gallery">
        <ImageGallery gallery={gallery} />
      </div>
      <div className="product-content_wrapper">
        <div className="product-content_container">
          <h2 className="product-content_name">{name}</h2>
          <div>
            <span className="price-tag">{`${prices[0].unit_amount / 100} ${
              prices[0].currency
            }`}</span>
            {children}
            <PostContent content={content} className="content" />
          </div>
        </div>
      </div>
    </section>
  )
}

const ProductPage = ({ data }) => {
  const { html, frontmatter, fields } = data.markdownRemark

  const variantReducer = (state, action) => {
    switch (action.type) {
      case "SET_LEATHER":
        return {
          ...state,
          leather: action.value,
        }
      case "SET_THREAD":
        return {
          ...state,
          thread: action.value,
        }
      case "SET_QUANTITY":
        return {
          ...state,
          quantity: action.value,
        }
      default:
        throw new Error(`unknown action ${action.type}`)
    }
  }

  const [variantState, dispatchVariant] = useReducer(variantReducer, {
    leather: frontmatter.leather_color[0],
    thread: frontmatter.thread_color[0],
    quantity: 1,
  })

  const cartDispatch = useDispatchCart()

  const addToCart = () => {
    return cartDispatch({
      type: "ADD",
      item: createCartItem(frontmatter, fields, variantState),
    })
  }

  const leatherChange = option =>
    dispatchVariant({ type: "SET_LEATHER", value: option })

  const threadChange = option =>
    dispatchVariant({ type: "SET_THREAD", value: option })

  return (
    <Layout>
      <ProductPageTemplate
        content={html}
        contentComponent={HTMLContent}
        gallery={frontmatter.gallery}
        prices={fields.prices}
        name={fields.name}
        prod_id={frontmatter.prod_id}
      >
        <div>
          <VariantsInput
            variants={frontmatter.leather_color}
            onChange={leatherChange}
            label="leather"
          />
          <VariantsInput
            variants={frontmatter.thread_color}
            onChange={threadChange}
            label="thread"
          />
          <input
            type="number"
            value={variantState.quantity}
            onChange={e =>
              dispatchVariant({
                type: "SET_QUANTITY",
                value: e.target.value,
              })
            }
            style={{ width: "48px" }}
          ></input>
          <button onClick={() => addToCart()}>add to cart</button>
        </div>
      </ProductPageTemplate>
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
        gallery {
          src
          srcSet
          base64
          sizes
          aspectRatio
        }
        leather_color {
          name
          color
        }
        thread_color {
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
