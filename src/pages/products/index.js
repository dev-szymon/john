import React from "react"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import ProductCard from "../../components/productCard/productCard"

import { graphql } from "gatsby"

const ProductsPage = ({ data }) => {
  const { edges } = data.allMarkdownRemark
  return (
    <Layout>
      <SEO title="Page two" />
      <h1>Products</h1>
      <div className="product-grid">
        {edges.map(({ node }) => {
          const { frontmatter, fields } = node
          return (
            <ProductCard>
              <img src={frontmatter.gallery[0]} alt={fields.name} />
              <h3 className="product-card_name">{fields.name}</h3>
              <span>{fields.prices[0].unit_amount / 100}</span>
              <span>{fields.prices[0].currency}</span>
            </ProductCard>
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
          frontmatter {
            title
            template
            prod_id
            gallery
          }
          fields {
            prices {
              id
              currency
              unit_amount
            }
            name
            slug
          }
        }
      }
    }
  }
`
