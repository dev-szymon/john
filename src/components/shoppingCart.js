import React from "react"
import { useCart, useDispatchCart } from "../context/cartContext"
import CartItem from "./cartItem/cartItem"
import CheckoutForm from "./checkoutForm/checkoutForm"

const ShoppingCart = () => {
  const { items } = useCart()
  const dispatch = useDispatchCart()

  return (
    <div
      style={{
        width: "80%",
        maxWidth: "620px",
        margin: "0 auto",
      }}
    >
      {items.length === 0 ? (
        <div>Your cart is empty</div>
      ) : (
        <>
          {items.map((item, index) => (
            <CartItem item={item} key={`${index} cart item`} />
          ))}
          <CheckoutForm />
          <button onClick={() => dispatch({ type: "CLEAR" })}>
            clear cart
          </button>
        </>
      )}
    </div>
  )
}

export default ShoppingCart
