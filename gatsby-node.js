const { createFilePath } = require("gatsby-source-filesystem")
const path = require("path")
const { clean } = require("diacritic")
const _ = require("lodash")
const md5 = require("md5")
const { createRemoteFileNode } = require("gatsby-source-filesystem")

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
              gallery
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
    const prices = await stripe.prices.list({
      active: true,
      product: prod_id,
    })
    const product = await stripe.products.retrieve(prod_id)

    // for each url in frontmatter.gallery create a gatsby image node

    const createGallery = async gallery => {
      let galleryNodes = []

      gallery.map(async image => {
        let fileNode = await createRemoteFileNode({
          url: image, // string that points to the URL of the image
          // parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
          createNode, // helper function in gatsby-node to generate the node
          createNodeId, // helper function in gatsby-node to generate the node id
          cache, // Gatsby's cache
          store, // Gatsby's Redux store
        })

        if (fileNode) {
          galleryNodes = galleryNodes.concat(fileNode)
        }
      })
      return createNode({
        id: createNodeId("gallery-id"),
        parent: node.id,
        gallery: galleryNodes,
        internal: {
          contentDigest: md5(JSON.stringify(galleryNodes)),
          type: "Array",
        },
      })
    }

    createGallery(gallery)

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
