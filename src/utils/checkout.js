import { getMatchingCurrency } from "./index"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PK)

const handleCheckout = async (items, currency, formData) => {
  // Get Stripe.js instance
  const stripe = await stripePromise

  // Call netlify functions to create the Checkout Session
  try {
    let purchased_items = []
    items.map(item => {
      return purchased_items.push({
        chosen_price: getMatchingCurrency(item.fields.prices, currency).id,
        chosen_variant: item.variant,
        prod_id: item.product.prod_id,
        name: item.fields.name,
      })
    })

    const response = await fetch(
      `${process.env.GATSBY_URL}/.netlify/functions/create-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ purchased_items, formData }),
      }
    )
    const session = await response.json()

    // When the customer clicks on the button, redirect them to Checkout.
    return stripe.redirectToCheckout({
      sessionId: session.id,
    })
  } catch (err) {
    console.log(err)
  }
}

export { handleCheckout }
