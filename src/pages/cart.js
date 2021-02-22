import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import { useCart, useDispatchCart } from "../context/cartContext"
import CartItem from "../components/cartItem/cartItem"
import { FlexRow } from "../components/flex"
import CheckoutForm from "../components/checkoutForm/checkoutForm"
import PriceDisplay from "../components/priceDisplay/priceDisplay"
import { getMatchingCurrency } from "../utils/index"

const EmptyCart = () => {
  return (
    <div className="empty-cart">
      <p>Your cart is empty</p>
      <Link to="/products">Browse available products!</Link>
    </div>
  )
}

const CartPage = () => {
  const { items, currency } = useCart()
  const dispatch = useDispatchCart()
  const total = items.reduce((acc, curr) => {
    const {
      fields: { prices },
    } = curr

    const price = getMatchingCurrency(prices, currency)
    return acc + price.unit_amount
  }, 0)
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
            <div style={{ borderTop: "1px solid var(--colorBlack" }}>
              <FlexRow align="flex-end" justify="flex-end">
                <p
                  style={{
                    margin: "0",
                    marginRight: "0.5rem",
                  }}
                >
                  Your order total:
                </p>
                <PriceDisplay amount={total} currency={currency} />
              </FlexRow>
            </div>
            <button
              className="medium-button grayBtn"
              onClick={() => dispatch({ type: "CLEAR" })}
            >
              clear cart
            </button>
            <CheckoutForm />
          </>
        )}
      </div>
    </Layout>
  )
}

export default CartPage
