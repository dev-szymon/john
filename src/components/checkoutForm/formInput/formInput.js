import React from "react"
import "./formInput.css"
import { Field, ErrorMessage } from "formik"
import { FlexColumn, FlexRow } from "../../flex"

const ErrorText = ({ children }) => {
  return <div className="error-text">{children}</div>
}

const FormInput = ({ className, label, name, ...rest }) => {
  return (
    <>
      <FlexColumn className={`${className} form-input`}>
        <label htmlFor={name}>{label}</label>
        <Field id={name} name={name} {...rest} />
      </FlexColumn>
      <ErrorMessage name={name} component={ErrorText} />
    </>
  )
}

export const Checkbox = ({ className, label, name, ...rest }) => {
  return (
    <FlexColumn className={className}>
      <FlexRow>
        <Field id={name} name={name} type="checkbox" {...rest} />
        <label htmlFor={name}>{label}</label>
      </FlexRow>
      <ErrorMessage name={name} component={ErrorText} />
    </FlexColumn>
  )
}

export default FormInput
