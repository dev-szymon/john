import React from "react"
import Img from "gatsby-image"
import "./cartItem.css"
import Hamburger from "../Hamburger/Hamburger"
import { useDispatchCart, useCart } from "../../context/cartContext"
import { FlexColumn, FlexRow } from "../flex"
import { getMatchingCurrency } from "../../utils/index"

const CartItem = ({ item }) => {
  const {
    product,
    variant: { quantity, thread, leather },
    fields: { prices, name },
  } = item

  const { currency } = useCart()
  const dispatch = useDispatchCart()

  const removeItem = item => {
    return dispatch({ type: "REMOVE", item: item })
  }

  const price = getMatchingCurrency(prices, currency)

  return (
    <div className="cart-item">
      <FlexRow justify="space-between">
        <h4>{name}</h4>
        <Hamburger open={true} handler={() => removeItem(item)} />
      </FlexRow>
      <FlexRow justify="space-between">
        <div className="cart-item__image">
          <Img fluid={product.gallery[0]} />
        </div>
        <FlexColumn justify="space-around">
          <FlexRow justify="space-between" align="flex-end">
            <span className="secondary-label">leather</span>
            <div
              className="variant-color"
              style={{ backgroundColor: leather.color }}
            ></div>
          </FlexRow>
          <FlexRow justify="space-between" align="flex-end">
            <span className="secondary-label">thread</span>
            <div
              className="variant-color"
              style={{ backgroundColor: thread.color }}
            ></div>
          </FlexRow>
        </FlexColumn>
        <FlexColumn align="flex-end" justify="space-around">
          <span className="secondary-label">quantity</span>
          <input
            type="number"
            value={quantity}
            onChange={e =>
              dispatch({
                type: "UPDATE",
                previous: item,
                updated: {
                  ...item,
                  variant: { ...item.variant, quantity: e.target.value },
                },
              })
            }
            style={{ width: "48px" }}
          ></input>
        </FlexColumn>
        <FlexColumn align="flex-end">
          <span className="secondary-label">total</span>
          <span>
            {`${(price.unit_amount * Number(quantity)) / 100} ${
              price.currency
            }`}
          </span>
        </FlexColumn>
      </FlexRow>
    </div>
  )
}

export default CartItem
