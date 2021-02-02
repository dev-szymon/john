const { createFilePath } = require("gatsby-source-filesystem")
const path = require("path")
const { clean } = require("diacritic")
const _ = require("lodash")
const md5 = require("md5")
const fetch = require("isomorphic-fetch")

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

exports.onCreateNode = async ({
  node,
  actions,
  getNode,
  cache,
  store,
  createNodeId,
}) => {
  const { createNodeField, createNode } = actions

  if (
    node.internal.type === `MarkdownRemark` &&
    node.frontmatter.template !== "product"
  ) {
    value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }

  if (node.frontmatter && node.frontmatter.template === "product") {
    const {
      prod_id,
      category,
      leather_color,
      thread_color,
      gallery,
    } = node.frontmatter

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
}

exports.createResolvers = ({ createResolvers }) => {
  const createCloudinaryGalleryNode = async src => {
    const aspectRatio = 1.5
    const srcSetWidths = [160, 320, 640, 900]
    const r = /\/upload\/v/
    const srcSet = (widths, cloudinaryUrl) => {
      return widths
        .map(w => {
          const transformations = `/upload/c_fill,h_${Math.floor(
            w / aspectRatio
          )},w_${w}/v`
          return `${cloudinaryUrl.replace(r, transformations)} ${w}w`
        })
        .join()
    }

    // todo make it detect the extension

    const getBase64 = async url => {
      const response = await fetch(url)
      const buffer = await response.arrayBuffer()
      const base64 = Buffer.from(buffer).toString("base64")
      return `data:image/jpeg;base64,${base64}`
    }

    const base64 = await getBase64(src.replace(r, `/upload/w_30/v`))
    const n = `/upload/c_fill,h_600,w_900/v`

    const ratioAdjusted = src.replace(r, n)

    return {
      aspectRatio,
      base64: base64,
      sizes: "(max-width: 900px) 100vw, 900px",
      src: ratioAdjusted,
      srcSet: srcSet(srcSetWidths, src),
    }
  }

  const resolvers = {
    Frontmatter: {
      featured_image: {
        resolve: (source, args, context, info) => {
          if (!source.featured_image) {
            return
          }
          return createCloudinaryGalleryNode(source.featured_image)
        },
      },
      gallery: {
        resolve: (source, args, context, info) => {
          if (!source.gallery) {
            return
          }

          return source.gallery.map(src => createCloudinaryGalleryNode(src))
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
      gallery: [CloudinaryGalleryNode] 
      featured_image: CloudinaryGalleryNode
    }
    type CloudinaryGalleryNode {
      aspectRatio: Float!
      base64: String!
      sizes: String!
      src: String!
      srcSet: String!
    }
  `

  createTypes(typeDefs)
}
