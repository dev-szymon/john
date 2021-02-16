import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import { useCart, useDispatchCart } from "../context/cartContext"
import CartItem from "../components/cartItem/cartItem"
import CheckoutForm from "../components/checkoutForm/checkoutForm"

const EmptyCart = () => {
  return (
    <div className="empty-cart">
      <p>Your cart is empty</p>
      <Link to="/products">Browse available products!</Link>
    </div>
  )
}

const CartPage = () => {
  const { items } = useCart()
  const dispatch = useDispatchCart()
  return (
    <Layout>
      <div
        style={{
          width: "80%",
          maxWidth: "480px",
          margin: "0 auto",
        }}
      >
        {items.length === 0 ? (
          <EmptyCart />
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
