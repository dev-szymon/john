import React from "react"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import ProductCard from "../../components/productCard/productCard"
import { graphql, Link } from "gatsby"

const ProductsPage = ({ data }) => {
  const { edges } = data.allMarkdownRemark
  return (
    <Layout>
      <SEO title="Page two" />
      <div style={{ height: "4rem", width: "100%" }}></div>
      <div className="product-grid">
        {edges.map(({ node }) => {
          const { frontmatter, fields } = node
          return (
            <Link to={fields.slug} key={node.id}>
              <ProductCard>
                <img
                  className="product-card_image"
                  src={frontmatter.gallery[0]}
                  alt={fields.name}
                />
                <div className="product-card_details">
                  <div className="product-card_price">
                    <span>{`${fields.prices[0].unit_amount / 100} ${
                      fields.prices[0].currency
                    }`}</span>
                  </div>
                  <h3 className="product-card_name">{fields.name}</h3>
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
