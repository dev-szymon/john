import React from "react"
import { CartProvider } from "./cartContext"
import "./global.css"

export const wrapRootElement = ({ element }) => {
  return <CartProvider>{element}</CartProvider>
}
