import React from "react"

const Select = ({ options, name, onChange, currentValue }) => {
  return (
    <div>
      <select
        name={name}
        onChange={e => onChange(e)}
        value={currentValue}
        style={{
          backgroundColor: "var(--colorWhite)",
          border: "none",
          cursor: "pointer",
        }}
      >
        {options.map(({ optionLabel, optionValue }) => (
          <option key={optionValue} value={optionValue}>
            {optionLabel}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select
