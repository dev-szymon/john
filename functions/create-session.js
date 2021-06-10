const stripe = require("stripe")(process.env.GATSBY_STRIPE_SK)
const { worldwide } = require("../src/utils/shipping_countries_allowed")

exports.handler = async ({ body }) => {
  try {
    const data = JSON.parse(body)
    const { purchased_items, formData } = data

    // retreive list of customers associated with provided email
    const customers = await stripe.customers.list({
      email: formData.email,
    })

    // construct customer id
    const customer =
      customers.data.length === 0 ? undefined : customers.data[0].id

    const line_items = purchased_items.map(item => {
      return {
        price: item.chosen_price,
        quantity: item.chosen_variant.quantity,
        // verify-payment endpoint relies on this description format,
        // because it parses variant names to verify that they are available on the product
        // and to extract color data from stripe metadata
        description: `LEATHER: ${item.chosen_variant.leather.name} - THREAD: ${item.chosen_variant.thread.name}`,
      }
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["p24", "card"],
      line_items: line_items,
      mode: "payment",
      billing_address_collection: "required",
      tax_id_collection: {
        enabled: true,
      },
      shipping_address_collection: {
        allowed_countries: worldwide,
      },
      customer_email: !customer ? formData.email : undefined,
      customer: customer,
      success_url: `${process.env.URL}/success`,
      cancel_url: `${process.env.URL}/cart`,
      allow_promotion_codes: true,
      metadata: {
        ...formData,
      },
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
