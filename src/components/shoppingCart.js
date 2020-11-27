import React, { useContext, useState } from "react"
import { CartContext } from "../context/cartContext"
import ShopItem from "./shopItem"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PK)

const ShoppingCart = ({ setCartOpen }) => {
  const { cart, setCart } = useContext(CartContext)

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    postal_code: "",
    tax_id: "",
  })

  const handleCheckout = async () => {
    // Get Stripe.js instance
    const stripe = await stripePromise

    // Call your backend to create the Checkout Session
    try {
      let cartItems = []
      cart.map(item => cartItems.push({ price: item.node.id, quantity: 1 }))
      const response = await fetch(
        `${process.env.GATSBY_URL}/.netlify/functions/create-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ cartItems, formData }),
        }
      )
      const session = await response.json()

      // When the customer clicks on the button, redirect them to Checkout.
      return stripe.redirectToCheckout({
        sessionId: session.id,
      })
    } catch (err) {
      console.log(err)
    }
  }

  if (cart.length === 0) {
    return (
      <>
        <div>Your cart is empty</div>
        <button onClick={() => setCartOpen(false)}>close cart</button>
      </>
    )
  } else {
    return (
      <div>
        {cart.map(i => (
          <ShopItem key={i.node.id} price={i} />
        ))}
        <button onClick={() => setCart([])}>clear cart</button>
        <button onClick={() => setCartOpen(false)}>close cart</button>
        <form>
          <div>
            <label htmlFor="name">name</label>
            <input
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              type="text"
              name="name"
            ></input>
          </div>
          <div>
            <label htmlFor="address">address</label>
            <input
              onChange={e =>
                setFormData({ ...formData, address: e.target.value })
              }
              type="text"
              name="address"
            ></input>
          </div>
          <div>
            <label htmlFor="tax_id">nip</label>
            <input
              onChange={e =>
                setFormData({ ...formData, tax_id: e.target.value })
              }
              type="text"
              name="tax_id"
            ></input>
          </div>
          <div>
            <label htmlFor="postal_code">postal code</label>
            <input
              onChange={e =>
                setFormData({ ...formData, postal_code: e.target.value })
              }
              type="text"
              name="postal_code"
            ></input>
          </div>
        </form>
        <button onClick={() => handleCheckout()}>checkout</button>
      </div>
    )
  }
}

export default ShoppingCart
