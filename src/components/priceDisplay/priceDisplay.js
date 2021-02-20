import React from "react"

const PriceDisplay = ({ currency, unit_amount, compareAt }) => {
  return (
    <div className="product-card_price">
      <span className="compare-price">
        {compareAt && `${Number(compareAt) / 100} ${currency}`}
      </span>
      <span className="actual-price">{`${unit_amount / 100} ${currency}`}</span>
    </div>
  )
}

export default PriceDisplay
