const getProductPrices = async id => {
  const response = await fetch(
    `https://api.stripe.com/v1/prices?product=${id}&active=true`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GATSBY_STRIPE_SK}`,
      },
    }
  )
  const prices = await response.json()
  return prices
}

const getProductData = async id => {
  const response = await fetch(`https://api.stripe.com/v1/products/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GATSBY_STRIPE_SK}`,
    },
  })

  const product = await response.json()

  return product
}

const createCartItem = (product, fields, variant) => {
  return {
    product: product,
    fields: fields,
    variant: variant,
  }
}

const getMatchingCurrency = (prices, currency) => {
  try {
    const filtered = prices
      .filter(price => price.currency.toLowerCase() === currency.toLowerCase())
      .reduce((prev, current) =>
        prev.price.amount > current.price.amount ? prev : current
      )
    return filtered
  } catch (err) {
    console.log(err)
  }
}

export { getProductPrices, getProductData, createCartItem, getMatchingCurrency }
