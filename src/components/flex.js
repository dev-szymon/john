import React from "react"

const FlexColumn = ({ justify, align, children, className, gap, ...rest }) => {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: justify,
        alignItems: align,
        gap: gap,
      }}
      {...rest}
    >
      {children}
    </div>
  )
}

const FlexRow = ({ justify, align, children, className, gap, ...rest }) => {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: justify,
        alignItems: align,
        gap: gap,
      }}
      {...rest}
    >
      {children}
    </div>
  )
}

export { FlexColumn, FlexRow }
