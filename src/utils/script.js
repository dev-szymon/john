const fs = require("fs")
fs.writeFileSync(
  "./.env",
  `GATSBY_STRIPE_SK=${process.env.GATSBY_STRIPE_SK}\n
  GATSBY_STRIPE_PK=${process.env.GATSBY_STRIPE_PK}\n
  STRIPE_WEBHOOK_SECRET=${process.env.STRIPE_WEBHOOK_SECRET}\n
  GMAIL_USER=${process.env.GMAIL_USER}\n
  GMAIL_PASS=${process.env.GMAIL_PASS}\n
  GATSBY_URL=${process.env.GATSBY_URL}\n
  CLOUDINARY_CLOUD_NAME=${process.env.CLOUDINARY_CLOUD_NAME}\n
  CLOUDINARY_API_KEY=${process.env.CLOUDINARY_API_KEY}\n
  CLOUDINARY_API_SECRET=${process.env.CLOUDINARY_API_SECRET}\n`
)

console.log(`Enviroment variables created`)
