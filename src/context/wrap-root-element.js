import React from "react"
import { CartProvider } from "./cartContext"
import "./global.css"
import "./typography.css"
import "./buttons.css"

export const wrapRootElement = ({ element }) => {
  return <CartProvider>{element}</CartProvider>
}
