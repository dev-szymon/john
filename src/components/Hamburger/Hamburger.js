import React from "react"
import "./Hamburger.css"

const Hamburger = ({ open, handler }) => {
  return (
    <button
      onClick={() => handler(!open)}
      className={`hamburger-button ${open && "open"}`}
    >
      <div className="hamburger-container">
        <div className={`hamburger-bar ${open && "open"}`}></div>
      </div>
    </button>
  )
}

export default Hamburger
