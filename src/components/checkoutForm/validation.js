import * as yup from "yup"

// yup.setLocale({
//   // use constant translation keys for messages without values
//   mixed: {
//     required: ({ path }) => ({
//       [path]: "The field is required",
//     }),
//   },
//   // use functions to generate an error object that includes the value from the schema

//   string: {
//     email: ({ path }) => ({ [path]: "Provide valid email" }),
//   },
// })

export const checkoutSchema = yup.object().shape({
  email: yup.string().email("Provide valid email").required("Field required"),
  phone: yup.string().required("Field required"),
  invoice: yup.bool(),
  company_name: yup.string().required("Field required"),
  street: yup.string().required("Field required"),
  postal_code: yup.string().required("Field required"),
  tax_id: yup.string().required("Field required"),
  terms_n_conditions: yup
    .bool()
    .isTrue("You need to accept Terms & Conditions"),
})
