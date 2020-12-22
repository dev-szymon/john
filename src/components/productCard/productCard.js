import React from "react"
import "./productCard.css"

const ProductCard = ({ className, children }) => {
  return <div className={`product-card ${className}`}>{children}</div>
}

export default ProductCard
