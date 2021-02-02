import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Img from "gatsby-image"
import "./home-page.css"

export const HomePageTemplate = ({
  featured_image,
  main_text,
  secondary_text,
}) => {
  return (
    <section>
      <Img fluid={featured_image} />
      <div className="home-page_typography">
        <h2 className="main-text">{main_text}</h2>
        <p className="secondary-text">{secondary_text}</p>
        <Link to="/products/" className="action-button">
          shop now
        </Link>
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
    <Layout>
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
          srcSet
          base64
          sizes
          aspectRatio
        }
        main_text
        secondary_text
      }
    }
  }
`
