import React from "react"
import { Formik, Form } from "formik"

const FormikContainer = ({
  initialValues,
  validationSchema,
  onSubmit,
  children,
  ...rest
}) => {
  return (
    <Formik
      {...rest}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>{children}</Form>
    </Formik>
  )
}

export default FormikContainer
