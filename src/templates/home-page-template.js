import React from "react"
import { Link, graphql } from "gatsby"
import Image from "gatsby-image"
import Layout from "../components/layout"
import "./home-page.css"
import SEO from "../components/seo"

export const HomePageTemplate = ({
  featured_image,
  main_text,
  secondary_text,
}) => {
  return (
    <section className="home-section">
      <div className="hero-section">
        <div className="home-page_typography">
          <div>
            <h2 className="main-text">{main_text}</h2>
            <p className="secondary-text">{secondary_text}</p>
          </div>
          <Link to="/products/" className="action-button blackBtn">
            shop now
          </Link>
        </div>
      </div>
    </section>
  )
}

const HomePage = ({ data }) => {
  const {
    featured_image,
    main_text,
    secondary_text,
  } = data.markdownRemark.frontmatter
  return (
    <Layout dark={true}>
      <SEO title="TheCraftsmanJohn" />
      <HomePageTemplate
        featured_image={featured_image}
        main_text={main_text}
        secondary_text={secondary_text}
      />
    </Layout>
  )
}

export default HomePage

export const LandingPageQuery = graphql`
  query LandingPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        featured_image {
          src
          base64
          height
          width
          aspectRatio
        }
        main_text
        secondary_text
      }
    }
  }
`
