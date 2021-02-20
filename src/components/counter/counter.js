import React from "react"
import { FlexRow } from "../flex"
import "./counter.css"

const Counter = ({ counter, setCounter }) => {
  return (
    <FlexRow align="center" className="counter">
      <button
        className="smRoundBtn"
        onClick={() => counter > 1 && setCounter(counter - 1)}
        disabled={counter === 1}
      >
        -
      </button>
      <div className="counter-value">{counter}</div>
      <button
        className="smRoundBtn"
        disabled={counter === 9}
        onClick={() => setCounter(counter + 1)}
      >
        +
      </button>
    </FlexRow>
  )
}

export default Counter
