import React from "react"
import CartProvider from "./cartContext"

export const wrapRootElement = ({ element }) => {
  return <CartProvider>{element}</CartProvider>
}
