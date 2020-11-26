const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const { worldwide } = require("../src/utils/shipping_countries_allowed")

exports.handler = async ({ body }) => {
  try {
    const { cartItems, formData } = JSON.parse(body)
    const { name, address, postal_code, tax_id } = formData
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["p24", "card"],
      line_items: cartItems,
      mode: "payment",
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: worldwide,
      },
      success_url: `${process.env.URL}/success`,
      cancel_url: `${process.env.URL}/cancel`,
      metadata: { name, address, postal_code, tax_id },
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ id: session.id }),
    }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 400,
      body: `Stripe Session error: ${error.message}`,
    }
  }
}
