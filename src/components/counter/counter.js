import React from "react"
import { FlexRow } from "../flex"

const Counter = ({ counter, setCounter }) => {
  return (
    <FlexRow>
      <button onClick={() => setCounter(counter - 1)}>-</button>
      <div>{counter}</div>
      <button onClick={() => setCounter(counter + 1)}>+</button>
    </FlexRow>
  )
}

export default Counter
