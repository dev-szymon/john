require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const nodemailer = require("nodemailer")

exports.handler = async ({ body, headers }) => {
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

  try {
    const stripeEvent = stripe.webhooks.constructEvent(
      body,
      headers["stripe-signature"],
      endpointSecret
    )

    if (stripeEvent.type === "checkout.session.completed") {
      const session = stripeEvent.data.object
      const { metadata } = session
      console.log(metadata)
      // todo use metadata to send email with purchase details

      const paymentIntent = await stripe.paymentIntents.retrieve(
        session.payment_intent
      )

      const chargeId = paymentIntent.charges.data[0].id

      const userEmail = paymentIntent.charges.data[0].billing_details.email

      // async..await is not allowed in global scope, must use a wrapper
      async function main(mail) {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: process.env.GMAIL_USER, // generated ethereal user
            pass: process.env.GMAIL_PASS, // generated ethereal password
          },
        })

        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: `"Dev-Szymon 👻" <${process.env.GMAIL_USER}>`, // sender address
          to: mail, // list of receivers
          subject: "Hello ✔", // Subject line
          text: "Hello world?", // plain text body
          html: `<b>Hello world?</b><a href="http://localhost:8000/files/${chargeId}">"http://localhost:8000/files/${chargeId}"</a>`, // html body
        })

        console.log("Message sent: %s", info.messageId)
      }

      main(userEmail).catch(console.error)

      // Fulfill the purchase...
      // handleCheckoutSession(session)

      return {
        statusCode: 200,
        body: `Checkout Succesful`,
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    }
  } catch (err) {
    console.log(err.message)
    return {
      statusCode: 400,
      body: `Webhook error: ${err.message}`,
    }
  }
}
