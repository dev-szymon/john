import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"

export const HomePageTemplate = ({
  featured_image,
  main_text,
  secondary_text,
}) => {
  return (
    <div>
      <img src={featured_image} alt="thecraftsmanjohn" />
      <h2>{main_text}</h2>
      <p>{secondary_text}</p>
    </div>
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
      <Link to="/products/">shop now</Link>
    </Layout>
  )
}

export default HomePage

export const LandingPageQuery = graphql`
  query LandingPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        featured_image
        main_text
        secondary_text
      }
    }
  }
`
