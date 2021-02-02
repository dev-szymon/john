require("dotenv").config()
const stripe = require("stripe")(process.env.GATSBY_STRIPE_SK)
const nodemailer = require("nodemailer")
const Handlebars = require("handlebars")
const fs = require("fs")
// const source = require("./order.hbs")

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
      const { metadata: session_metadata } = session
      // todo use metadata to send email with purchase details

      const paymentIntent = await stripe.paymentIntents.retrieve(
        session.payment_intent
      )

      const userEmail = paymentIntent.charges.data[0].billing_details.email
      const charge = paymentIntent.charges.data[0]

      const { data: items } = await stripe.checkout.sessions.listLineItems(
        session.id,
        {
          expand: ["data.price.product"],
        }
      )

      const parseVariant = (description, variants) => {
        const leather = /LEATHER: /
        const thread = / - THREAD: /
        const descriptionString = description
          .replace(leather, `"chosen_leather": "`)
          .replace(thread, `", "chosen_thread": "`)

        const string = `{ ${descriptionString}" }`
        const parsed = JSON.parse(string)

        const { leather_color, thread_color } = variants

        const item_leather = leather_color.filter(
          l => l.name === parsed.chosen_leather
        )
        const item_thread = thread_color.filter(
          th => th.name === parsed.chosen_thread
        )
        return { leather: item_leather[0], thread: item_thread[0] }
      }

      const getOrderEmail = () => {
        const constructItems = items.map(i => {
          const { description } = i
          const variants = JSON.parse(i.price.product.metadata.data)
          return { ...i, ...parseVariant(description, variants) }
        })

        const order_email = fs.readFileSync("./functions/order.hbs").toString()

        const renderToString = (source, context) => {
          const template = Handlebars.compile(source)
          const outputString = template(context)
          return outputString
        }

        const order_context = {
          products: constructItems,
          charge: charge,
          session_metadata: session_metadata,
        }

        return renderToString(order_email, order_context)
      }
      // const order_email = fs.readFile("./functions/order.hbs", async function (
      //   err,
      //   data
      // ) {
      //   if (!err) {
      //     // this will be called after the file is read

      //     // make the buffer into a string
      //     const source = data.toString()
      //     // call the render function
      //     const context = {
      //       products: constructItems,
      //       charge: charge,
      //       session_metadata: session_metadata,
      //     }

      //     const email = await renderToString(source, context)

      //     return email
      //   } else {
      //     // handle file read error
      //     console.log(err)
      //   }
      //   async function renderToString(source, context) {
      //     const template = Handlebars.compile(source)
      //     const outputString = template(context)
      //     console.log(outputString)
      //     return outputString
      //   }
      // })

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
        // let client = await transporter.sendMail({
        //   from: `"Dev-Szymon 👻" <${process.env.GMAIL_USER}>`, // sender address
        //   to: mail, // list of receivers
        //   subject: "Hello ✔", // Subject line
        //   text: "Hello world?", // plain text body
        //   html: `<b>Hello world?</b><a href="http://localhost:8000/files/${chargeId}">"http://localhost:8000/files/${chargeId}"</a>`, // html body
        // })

        let shop = transporter.sendMail({
          from: `"Dev-Szymon 👻" <${process.env.GMAIL_USER}>`, // sender address
          to: process.env.GMAIL_USER, // list of receivers
          subject: `New purchase: ${charge.id}✔`, // Subject line
          html: getOrderEmail(), // html body
        })

        // console.log("Message sent to: %s", client.messageId)
        console.log("Message sent to: %s", shop.messageId)
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
