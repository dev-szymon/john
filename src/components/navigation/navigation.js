import React from "react"
import "./navigation.css"
import { Link } from "gatsby"
import etsy from "../../images/etsy.svg"

const Navigation = ({ isOpen }) => {
  return (
    <div className={`navigation ${isOpen && "open"}`}>
      <nav>
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
      <div style={{ width: "200px" }}>
        <img src={etsy} alt="etsy"></img>
      </div>
    </div>
  )
}

export default Navigation
