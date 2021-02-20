import React from "react"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import ProductCard from "../../components/productCard/productCard"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import { useCart } from "../../context/cartContext"
import { getMatchingCurrency } from "../../utils/index"
import "./products.css"
import PriceDisplay from "../../components/priceDisplay/priceDisplay"

const ProductsPage = ({ data }) => {
  const { currency } = useCart()
  const { edges } = data.allMarkdownRemark
  return (
    <Layout>
      <SEO title="Page two" />
      <div className="breadcrumbs">
        <Link to="/">home</Link>
        <span>/</span>
        <Link className="current" to="/products">
          products
        </Link>
      </div>
      <div className="product-grid">
        {edges.map(({ node }) => {
          const {
            fields: { prices, name, slug },
            frontmatter: { gallery },
          } = node

          const {
            metadata: { compareAt },
            unit_amount,
          } = getMatchingCurrency(prices, currency)

          return (
            <Link to={slug} key={node.id}>
              <ProductCard>
                <Img className="product-card_image" fluid={gallery[0]} />
                <div className="product-card_details">
                  <h4 className="product-card_name">{name}</h4>
                  <PriceDisplay
                    compareAt={compareAt}
                    unit_amount={unit_amount}
                    currency={currency}
                  />
                </div>
              </ProductCard>
            </Link>
          )
        })}
      </div>
    </Layout>
  )
}

export default ProductsPage

export const ProductsPageQuery = graphql`
  query ProductsPageQuery {
    allMarkdownRemark(
      filter: { frontmatter: { template: { eq: "product" } } }
    ) {
      edges {
        node {
          id
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
          }
          fields {
            prices {
              id
              currency
              unit_amount
              metadata {
                compareAt
              }
            }
            name
            slug
          }
        }
      }
    }
  }
`
