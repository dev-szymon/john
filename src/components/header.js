import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useContext } from "react"
import { CartContext } from "../context/cartContext"
import cartIcon from "../images/cart.svg"
import back from "../images/back.svg"
import "./header.css"
import Hamburger from "./Hamburger/Hamburger"

const Header = ({ siteTitle, setCartOpen, cartOpen }) => {
  const { cart } = useContext(CartContext)

  return (
    <header className="header-container">
      <button className="button-reset" onClick={() => setCartOpen(!cartOpen)}>
        <div className="cart-icon">
          {cartOpen ? (
            <img src={back} alt="back" />
          ) : (
            <>
              <img src={cartIcon} alt="cart" />
              {cart.length > 0 && (
                <div className="cart-counter">{`${cart.length}`}</div>
              )}
            </>
          )}
        </div>
      </button>
      <h1 className="header-title">
        <Link to="/">{siteTitle}</Link>
      </h1>
      <Hamburger />
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
