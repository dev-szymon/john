import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ShopItem from "../components/shopItem"
import { graphql } from "gatsby"

const ProductsPage = ({ data }) => {
  const { edges } = data.allStripePrice
  return (
    <Layout>
      <SEO title="Page two" />
      <h1>Products</h1>
      {edges.map(node => (
        <ShopItem key={node.id} price={node} />
      ))}
    </Layout>
  )
}

export default ProductsPage

export const ProductsPageQuery = graphql`
  query ProductsPageQuery {
    allStripePrice(filter: { active: { eq: true } }) {
      edges {
        node {
          id
          product {
            images
            name
          }
          currency
          unit_amount
          unit_amount_decimal
        }
      }
    }
  }
`
