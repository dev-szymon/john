import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { useCart } from "../context/cartContext"
import cartIcon from "../images/cart.svg"
import "./header.css"
import Hamburger from "./Hamburger/Hamburger"

const Header = ({ siteTitle }) => {
  const { items, currency } = useCart()
  return (
    <header className="header-container">
      <Hamburger />
      <h1 className="header-title">
        <Link to="/">{siteTitle}</Link>
      </h1>
      <div style={{ display: "flex", alignItems: "center" }}>
        <span>{currency}</span>
        <Link to="/cart">
          <div className="cart-icon">
            <img src={cartIcon} alt="cart" />
            {items.length > 0 && (
              <div className="cart-counter">{`${items.length}`}</div>
            )}
          </div>
        </Link>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
