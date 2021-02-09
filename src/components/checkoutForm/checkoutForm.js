import React, { useState } from "react"
import FormInput, { Checkbox } from "./formInput/formInput"
import { useCart } from "../../context/cartContext"
import { handleCheckout } from "../../utils/checkout"
import { FlexRow } from "../flex"
import { checkoutSchema } from "./validation"
import FormikContainer from "./formikContainer"

const CheckoutForm = () => {
  const { items, currency } = useCart()
  const [needInvoice, setNeedInvoice] = useState(false)

  const initialValues = {
    email: "",
    phone: "",
    invoice: false,
    company_name: "",
    street: "",
    postal_code: "",
    tax_id: "",
    terms_n_conditions: false,
  }

  return (
    <FormikContainer
      className="login-formik"
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
      <FormInput name="email" label="email" type="email" />
      <FormInput name="phone" label="phone number" />
      <FlexRow>
        <input
          type="checkbox"
          value={needInvoice}
          onClick={() => setNeedInvoice(!needInvoice)}
        />
        <p>I need company invoice</p>
      </FlexRow>
      {needInvoice && (
        <>
          <FormInput name="company_name" label="company name" />
          <FormInput className="checkout-input" name="street" label="street" />
          <FormInput name="postal_code" label="postal code" />
          <FormInput className="checkout-input" name="city" label="city" />
          <FormInput name="tax_id" label="nip/tax id" />
        </>
      )}
      <Checkbox
        type="checkbox"
        name="terms_n_conditions"
        label={`Accept Terms & Conditions`}
      />
      <button type="submit">checkout</button>
    </FormikContainer>
  )
}

export default CheckoutForm
