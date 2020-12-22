/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { useState } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import ShoppingCart from "./shoppingCart"
import Header from "./header"
// import "./layout.css"
// need to write my own reset

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <>
      <Header
        siteTitle={data.site.siteMetadata?.title || `Title`}
        setCartOpen={setCartOpen}
        cartOpen={cartOpen}
      />
      {cartOpen ? (
        <ShoppingCart setCartOpen={setCartOpen} />
      ) : (
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0 1.0875rem 1.45rem`,
          }}
        >
          <main>{children}</main>
          <footer
            style={{
              marginTop: `2rem`,
            }}
          >
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.com">Gatsby</a>
          </footer>
        </div>
      )}
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
