import React from "react"
import "./variantsInput.css"

const VariantsInput = ({ variants, onChange, label }) => {
  return (
    <div className="variants-input">
      <span>{label}</span>
      {variants.map((option, i) => (
        <input
          key={`${i} variant ${option.color}`}
          className="color-option"
          type="radio"
          name={label}
          value={option}
          defaultChecked={i === 0}
          onClick={() => onChange(option)}
          style={{ backgroundColor: option.color }}
        />
      ))}
    </div>
  )
}

export default VariantsInput
