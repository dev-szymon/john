const fs = require("fs")
fs.writeFileSync(
  "./.env",
  `STRIPE_SECRET_KEY=${process.env.STRIPE_SECRET_KEY}\n
  STRIPE_WEBHOOK_SECRET=${process.env.STRIPE_WEBHOOK_SECRET}\n
  GMAIL_USER=${GMAIL_USER}\n
  GMAIL_PASS=${GMAIL_PASS}\n
  GATSBY_URL=${GATSBY_URL}\n`
)
