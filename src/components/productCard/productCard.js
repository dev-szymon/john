import React from "react"
import "./productCard.css"

const ProductCard = ({ className, children, ...rest }) => {
  return (
    <div className={`product-card ${className}`} {...rest}>
      {children}
    </div>
  )
}

export default ProductCard
