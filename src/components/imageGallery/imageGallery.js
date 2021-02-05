import React, { useState } from "react"
import "./imageGallery.css"
import Img from "gatsby-image"

const ImageGallery = ({ gallery }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const isGatsbyImg = gallery[0].srcSet ? true : false
  return (
    <div className="gallery-container">
      {isGatsbyImg ? (
        <Img className="featured-image" fluid={gallery[currentIndex]} />
      ) : (
        <img src={gallery[currentIndex]} alt="current" />
      )}
      <div className="image-list">
        {gallery.map((image, index) => (
          <div
            className="image-list_item"
            key={`${isGatsbyImg ? image.src : image} ${index}`}
            onClick={() => setCurrentIndex(index)}
          >
            {isGatsbyImg ? (
              <Img fluid={image} />
            ) : (
              <img src={image} alt={`gallery ${index}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ImageGallery
