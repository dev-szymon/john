import React, { useState } from "react"
import { Link } from "gatsby"
import { useCart } from "../../context/cartContext"
import cartIcon from "../../images/cart.svg"
import "./header.css"
import Hamburger from "../Hamburger/Hamburger"
import { FlexRow } from "../flex"
import Navigation from "../navigation/navigation"
import Select from "../select/select"
import { useDispatchCart } from "../../context/cartContext"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { items, currency } = useCart()
  const dispatch = useDispatchCart()

  const handleChange = e => {
    dispatch({ type: "CURRENCY", currency: e.target.value })
  }
  return (
    <header className="header-container">
      <Hamburger
        open={isOpen}
        handler={setIsOpen}
        className="header-hamburger"
      />
      <h1 className="header-title">
        <Link to="/">TheCraftsmanJohn</Link>
      </h1>
      <Navigation isOpen={isOpen} />

      <FlexRow align="center">
        <Select
          onChange={handleChange}
          options={[
            { optionLabel: "EUR", optionValue: "eur" },
            { optionLabel: "PLN", optionValue: "pln" },
          ]}
          currentValue={currency}
        />
        <Link to="/cart">
          <div className="cart-icon">
            <img src={cartIcon} alt="cart" />
            {items.length > 0 && (
              <div className={`cart-counter`}>{`${items.length}`}</div>
            )}
          </div>
        </Link>
      </FlexRow>
    </header>
  )
}

export default Header
