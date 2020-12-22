import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <Link to="/products/">Go to page 2</Link> <br />
    </Layout>
  )
}

export default IndexPage

export const IndexPageQuery = graphql`
  query IndexPageQuery {
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
