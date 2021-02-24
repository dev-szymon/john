const { createFilePath } = require("gatsby-source-filesystem")
const path = require("path")
const { clean } = require("diacritic")
const _ = require("lodash")
const md5 = require("md5")
const {
  createFixedCloudinaryNode,
  createFluidCloudinaryNode,
} = require("./src/utils/index")

const stripe = require("stripe")(process.env.GATSBY_STRIPE_SK)

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
    const { node } = page
    const { template } = node.frontmatter

    if (node.fields) {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`src/templates/${template}-page-template.js`),
        context: {
          id: node.id,
        },
      })

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
        const categoryPath = `/products/category/${_.kebabCase(
          clean(category)
        )}/`
        createPage({
          path: categoryPath,
          component: path.resolve(`src/templates/category-page-template.js`),
          context: {
            currentPage: category,
          },
        })
      })
    }
  })
}

exports.onCreateNode = async ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (
    node.internal.type === `MarkdownRemark` &&
    node.frontmatter.template !== "product"
  ) {
    // if it is not a product md then create slug from it's path

    value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }

  if (node.frontmatter && node.frontmatter.template === "product") {
    const { prod_id, category, leather_color, thread_color } = node.frontmatter

    try {
      const product = await stripe.products.retrieve(prod_id)

      if (!product) {
        // if the product with given id doesn't exist, don't build from that md file

        return
      } else {
        const productMetadata = JSON.stringify({
          leather_color: leather_color,
          thread_color: thread_color,
          category: category,
        })
        const md5hash = md5(productMetadata)

        if (md5hash !== product.metadata.md5hash) {
          // if there are changes to metadata in frontmatter, update stripe products

          await stripe.products.update(prod_id, {
            metadata: {
              data: productMetadata,
              md5hash: md5hash,
            },
          })
          console.log(`Product ${prod_id} metadata updated.`)
        }

        // create additional fields from stripe data

        createNodeField({
          name: `slug`,
          node,
          value: `/products/${_.kebabCase(clean(product.name))}`,
        })

        const prices = await stripe.prices.list({
          active: true,
          product: prod_id,
        })

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
    } catch (err) {
      console.log(err)
    }
  }
}

exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    Frontmatter: {
      featured_image: {
        resolve: (source, args, context, info) => {
          if (!source.featured_image) {
            return
          }
          return createFixedCloudinaryNode(source.featured_image, 1920, 1080)
        },
      },
      gallery: {
        resolve: (source, args, context, info) => {
          if (!source.gallery) {
            return
          }

          return source.gallery.map(src => createFluidCloudinaryNode(src))
        },
      },
    },
  }

  createResolvers(resolvers)
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }
    type Frontmatter {
      gallery: [FluidCloudinaryNode] 
      featured_image: FixedCloudinaryNode
    }
    type FluidCloudinaryNode {
      aspectRatio: Float!
      base64: String!
      sizes: String!
      src: String!
      srcSet: String!
    }
    type FixedCloudinaryNode {
      aspectRatio: Float!
      base64: String!
      height: Int!
      src: String!
      width: Int!
      srcSet: String!
    }
  `

  createTypes(typeDefs)
}
