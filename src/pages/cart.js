import React from "react"
import Layout from "../components/layout"
import { useCart, useDispatchCart } from "../context/cartContext"
import CartItem from "../components/cartItem/cartItem"
import CheckoutForm from "../components/checkoutForm/checkoutForm"

const CartPage = () => {
  const { items } = useCart()
  const dispatch = useDispatchCart()
  return (
    <Layout>
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
    </Layout>
  )
}

export default CartPage
