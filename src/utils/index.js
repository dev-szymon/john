const fetch = require("isomorphic-fetch")
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

const createFixedCloudinaryNode = async (src, width, height) => {
  const aspectRatio = width / height

  const n = `/upload/c_fill,h_${height},w_${width}/v`
  const r = /\/upload\/v/

  const srcOutcome = src.replace(r, n)

  const getBase64 = async url => {
    const response = await fetch(url)
    const buffer = await response.arrayBuffer()
    const base64 = Buffer.from(buffer).toString("base64")
    return `data:image/png;base64,${base64}`
  }
  const srcSetWidths = [240, 840, 1280, 1920]
  const srcSet = (widths, cloudinaryUrl) => {
    return widths
      .map(w => {
        const transformations = `/upload/c_fill,h_${Math.floor(
          w / aspectRatio
        )},w_${w}/v`
        return `${cloudinaryUrl.replace(r, transformations)} ${w}w`
      })
      .join()
  }

  const base64 = await getBase64(src.replace(r, `/upload/w_30/v`))
  return {
    aspectRatio: aspectRatio,
    base64: base64,
    width: width,
    height: height,
    src: srcOutcome,
    srcSet: srcSet(srcSetWidths, src),
  }
}

const createFluidCloudinaryNode = async src => {
  const aspectRatio = 16 / 9
  const srcSetWidths = [160, 320, 640, 900]
  const r = /\/upload\/v/
  const srcSet = (widths, cloudinaryUrl) => {
    return widths
      .map(w => {
        const transformations = `/upload/c_fill,h_${Math.floor(
          w / aspectRatio
        )},w_${w}/v`
        return `${cloudinaryUrl.replace(r, transformations)} ${w}w`
      })
      .join()
  }

  // todo make it detect the extension

  const getBase64 = async url => {
    const response = await fetch(url)
    const buffer = await response.arrayBuffer()
    const base64 = Buffer.from(buffer).toString("base64")
    return `data:image/jpeg;base64,${base64}`
  }

  const base64 = await getBase64(src.replace(r, `/upload/w_30/v`))
  const n = `/upload/c_fill,h_600,w_900/v`

  const ratioAdjusted = src.replace(r, n)

  return {
    aspectRatio,
    base64: base64,
    sizes: "(max-width: 900px) 100vw, 900px",
    src: ratioAdjusted,
    srcSet: srcSet(srcSetWidths, src),
  }
}

module.exports = {
  getProductPrices,
  getProductData,
  createCartItem,
  getMatchingCurrency,
  createFixedCloudinaryNode,
  createFluidCloudinaryNode,
}
