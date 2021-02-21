import React from "react"

const PriceDisplay = ({ currency, amount, compareAt }) => {
  return (
    <div className="product-card_price">
      <span className="compare-price">
        {compareAt && `${Number(compareAt) / 100} ${currency}`}
      </span>
      <span className="actual-price">{`${
        amount / 100
      } ${currency.toLowerCase()}`}</span>
    </div>
  )
}

export default PriceDisplay
