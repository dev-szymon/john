const { createFilePath } = require("gatsby-source-filesystem")
const fetch = require("isomorphic-fetch")
const path = require("path")
const { clean } = require("diacritic")
const _ = require("lodash")
const md5 = require("md5")

const stripe = require("stripe")(process.env.GATSBY_STRIPE_SK)

// const getProductPrices = async id => {
//   const response = await fetch(
//     `https://api.stripe.com/v1/prices?product=${id}&active=true`,
//     {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${process.env.GATSBY_STRIPE_SK}`,
//       },
//     }
//   )
//   const prices = await response.json()
//   return prices
// }

// const getProductData = async id => {
//   const response = await fetch(`https://api.stripe.com/v1/products/${id}`, {
//     method: "GET",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${process.env.GATSBY_STRIPE_SK}`,
//     },
//   })

//   const product = await response.json()

//   return product
// }

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const pagesQuery = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              template
              category
              leather_color {
                name
                color
              }
              thread_color {
                name
                color
              }
            }
          }
        }
      }
    }
  `)

  return pagesQuery.data.allMarkdownRemark.edges.forEach(page => {
    // ----creating categories pages----
    let categories = []
    // Iterate through each post, putting all found categories into `categories`
    if (_.get(page, `node.frontmatter.category`)) {
      categories = categories.concat(page.node.frontmatter.category)
    }

    // Eliminate duplicate category
    categories = _.uniq(categories)

    // Make category pages
    categories.forEach(category => {
      const categoryPath = `/products/category/${_.kebabCase(clean(category))}/`
      createPage({
        path: categoryPath,
        component: path.resolve(`src/templates/category-page-template.js`),
        context: {
          currentPage: category,
        },
      })
    })
  })
}

exports.onCreateNode = async ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }

  if (node.frontmatter && node.frontmatter.template === "product") {
    const { prod_id, category, leather_color, thread_color } = node.frontmatter
    const prices = await stripe.prices.list({
      active: true,
      product: prod_id,
    })

    const product = await stripe.products.retrieve(prod_id)

    // if there are changes to metadata in frontmatter, update stripe products

    const metadataObject = JSON.stringify({
      leather_color: leather_color,
      thread_color: thread_color,
      category: category,
    })
    const md5hash = md5(metadataObject)

    if (md5hash !== product.metadata.md5hash) {
      await stripe.products.update(prod_id, {
        metadata: {
          data: metadataObject,
          md5hash: md5hash,
        },
      })
      console.log(`Product ${prod_id} metadata updated.`)
    }

    createNodeField({
      name: `prices`,
      node,
      value: [...prices.data],
    })

    createNodeField({
      name: `name`,
      node,
      value: product.name,
    })
  }
}
