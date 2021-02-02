import React, { useState } from "react"
import "./imageGallery.css"
import Img from "gatsby-image"

const ImageGallery = ({ gallery }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  return (
    <div className="gallery-container">
      <Img className="featured-image" fluid={gallery[currentIndex]} />
      <div className="image-list">
        {gallery.map((image, index) => (
          <div
            className="image-list_item"
            key={`${image.src} ${index}`}
            onClick={() => setCurrentIndex(index)}
          >
            <Img fluid={image} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ImageGallery
