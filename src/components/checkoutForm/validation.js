import * as yup from "yup"

export const checkoutSchema = yup.object().shape({
  email: yup
    .string()
    .email("Provide valid email address")
    .required("Provide email address"),
  phone: yup.string().required("Provide phone number"),
  invoice: yup.boolean().required(""),
  company_name: yup.string().when("invoice", {
    is: true,
    then: yup.string().required("Provide your company name"),
  }),
  street: yup.string().when("invoice", {
    is: true,
    then: yup.string().required("Provide street name"),
  }),
  city: yup.string().when("invoice", {
    is: true,
    then: yup.string().required("Provide postal code"),
  }),
  postal_code: yup.string().when("invoice", {
    is: true,
    then: yup.string().required("Provide postal code"),
  }),
  tax_id: yup.string().when("invoice", {
    is: true,
    then: yup.string().required("Provide your tax id/vat number"),
  }),
  terms_n_conditions: yup
    .boolean()
    .isTrue("You need to accept Terms & Conditions"),
})
