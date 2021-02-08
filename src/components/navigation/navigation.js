import React from "react"
import "./navigation.css"
import { Link } from "gatsby"

const Navigation = ({ isOpen }) => {
  return (
    <nav className={`navigation ${isOpen && "open"}`}>
      <ul>
        <Link to="/">
          <li>{`Home`}</li>
        </Link>
        <Link to="/products">
          <li>{`Products`}</li>
        </Link>
        <Link to="/about">
          <li>{`About & Contact`}</li>
        </Link>
      </ul>
    </nav>
  )
}

export default Navigation
