import React, { useReducer, useContext, createContext, useEffect } from "react"

const CartStateContext = createContext({ items: [], currency: "EUR" })
const CartDispatchContext = createContext()

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return { items: [...state.items, action.item], currency: state.currency }
    case "REMOVE":
      const newArr = [...state.items]
      newArr.splice(state.items.indexOf(action.item), 1)
      return { items: newArr, currency: state.currency }
    case "UPDATE":
      const updatedArr = [...state.items]
      action.updated.variant.quantity > 0
        ? updatedArr.splice(
            state.items.indexOf(action.previous),
            1,
            action.updated
          )
        : updatedArr.splice(state.items.indexOf(action.previous), 1)
      return { items: updatedArr, currency: state.currency }
    case "CURRENCY":
      return { items: [...state.items], currency: action.currency }
    case "CLEAR":
      return { items: [], currency: state.currency }
    case "FILL":
      return { items: [...action.cart.items], currency: action.cart.currency }
    default:
      throw new Error(`unknown action ${action.type}`)
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { items: [], currency: "EUR" })

  useEffect(() => {
    if (window) {
      const data = localStorage.getItem("cart")
      data && dispatch({ type: "FILL", cart: JSON.parse(data) })
    }
  }, [])

  useEffect(() => {
    if (window) {
      localStorage.setItem("cart", JSON.stringify(state))
    }
  })

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  )
}

export const useCart = () => useContext(CartStateContext)
export const useDispatchCart = () => useContext(CartDispatchContext)
