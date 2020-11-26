import React, { useContext } from "react"
import { CartContext } from "../context/cartContext"

const ShopItem = ({ price }) => {
  const { cart, setCart } = useContext(CartContext)
  const { product, currency, unit_amount } = price.node
  const { name } = product

  return (
    <div style={{ border: "1px solid #000" }}>
      <h4 style={{ margin: "0" }}>{name}</h4>
      <p>
        <span>{unit_amount / 100}</span>
        <span>{currency}</span>
      </p>
      <button onClick={() => setCart([...cart, price])}>add to cart</button>
    </div>
  )
}

export default ShopItem
