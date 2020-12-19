import React from "react"
import "./Hamburger.css"

const Hamburger = ({ open, setOpen, handlerBoolean }) => {
  return (
    <button
      onClick={() => setOpen(handlerBoolean)}
      className={`hamburger-button ${open && "open"}`}
    >
      <div className="hamburger-container">
        <div className={`hamburger-bar ${open && "open"}`}></div>
      </div>
    </button>
  )
}

export default Hamburger
