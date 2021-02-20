import React from "react"

const Select = ({ options, name, onChange, currentValue }) => {
  return (
    <div>
      <select
        name={name}
        onChange={e => onChange(e)}
        value={currentValue}
        style={{ backgroundColor: "var(--colorWhite)", border: "none" }}
      >
        {options.map(({ optionLabel, optionValue }) => (
          <option value={optionValue}>{optionLabel}</option>
        ))}
      </select>
    </div>
  )
}

export default Select
