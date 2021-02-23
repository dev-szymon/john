import React from "react"
import FormInput, { Checkbox } from "./formInput/formInput"
import { useCart } from "../../context/cartContext"
import { handleCheckout } from "../../utils/checkout"
import { checkoutSchema } from "./validation"
import { useFormikContext, Form, Formik } from "formik"

const InvoiceFields = () => {
  const { values } = useFormikContext()
  return (
    <>
      {values.invoice && (
        <>
          <FormInput name="company_name" label="company name" />
          <FormInput className="checkout-input" name="street" label="street" />
          <FormInput name="postal_code" label="postal code" />
          <FormInput className="checkout-input" name="city" label="city" />
          <FormInput name="tax_id" label="nip/tax id" />
        </>
      )}
    </>
  )
}

const CheckoutForm = () => {
  const { items, currency } = useCart()

  const initialValues = {
    email: "",
    phone: "",
    invoice: false,
    company_name: "",
    city: "",
    street: "",
    postal_code: "",
    tax_id: "",
    terms_n_conditions: false,
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={checkoutSchema}
      onSubmit={values => {
        try {
          handleCheckout(items, currency, values)
        } catch (err) {
          console.log(err)
        }
      }}
    >
      <Form>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <FormInput name="email" label="email" type="email" />
          <FormInput name="phone" label="phone number" />
          <Checkbox
            name="invoice"
            label={`I need company invoice`}
            className="to-left-label"
          />
          <InvoiceFields />
          <Checkbox
            className="to-left-label"
            type="checkbox"
            name="terms_n_conditions"
            label={`Accept Terms & Conditions`}
          />
          <button
            className="action-button blackBtn"
            type="submit"
            style={{ alignSelf: "flex-end" }}
          >
            checkout
          </button>
        </div>
      </Form>
    </Formik>
  )
}

export default CheckoutForm
