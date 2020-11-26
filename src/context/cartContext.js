import React, { createContext, useState, useEffect } from "react"

export const CartContext = createContext({
  cart: [],
  setCart: () => console.log("test"),
})

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  useEffect(() => {
    const data = localStorage.getItem("cart")
    data && setCart(JSON.parse(data))
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  })

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
