import React, { useState } from "react"
import "./imageGallery.css"
import Img from "gatsby-image"

const ImageGallery = ({ gallery }) => {
  const [imageIndex, setImageIndex] = useState(gallery[0])
  return (
    <div className="gallery-container">
      <img
        className="featured-image"
        src={gallery[imageIndex]}
        alt="featured"
      />
      <div className="image-list">
        {gallery.map(image => (
          <Img
            fluid={image.childImageSharp.fluid}
            onClick={() => setImageIndex(image)}
          />
        ))}
      </div>
    </div>
  )
}

export default ImageGallery
