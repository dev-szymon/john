import React from "react"

const Mail = () => {
  const items = {
    id: "li_1IEmNLIi89l05IdyLxwa5Kub",
    object: "item",
    amount_subtotal: 3900,
    amount_total: 3900,
    currency: "eur",
    description: "LEATHER: Black - THREAD: Crimson Red",
    price: {
      id: "price_1ICQ3zIi89l05Idytr3ln3or",
      object: "price",
      active: true,
      billing_scheme: "per_unit",
      created: 1611323555,
      currency: "eur",
      livemode: false,
      lookup_key: null,
      metadata: {},
      nickname: null,
      product: {
        id: "prod_HqskuLbsMvvwsg",
        object: "product",
        active: true,
        attributes: [],
        created: 1597680917,
        description: null,
        images: [
          "https://files.stripe.com/links/fl_test_V154AvGLVXTHDVs4lkx0fADL",
        ],
        livemode: false,
        metadata: {
          md5hash: "c0d60f0839657d939ce3e7f300cbb4ee",
          data:
            '{"leather_color":[{"name":"Red Sunset","color":"#e20707"},{"name":"Black","color":"#000000"}],"thread_color":[{"name":"Crimson Red","color":"#e20707"},{"name":"Crimson Red","color":"#e21607"},{"name":"Crimson Red","color":"#f3c707"},{"name":"Black","color":"#000000"}],"category":["pattern"]}',
        },
        name: "Porada dietetyczna",
        statement_descriptor: "porada dietetyczna",
        type: "service",
        unit_label: null,
        updated: 1611323556,
      },
      recurring: null,
      tiers_mode: null,
      transform_quantity: null,
      type: "one_time",
      unit_amount: 3900,
      unit_amount_decimal: "3900",
    },
    quantity: 1,
  }

  const session_metadata = {
    email: "test-68a380@test.mailgenius.com",
    phone: "345345456",
    invoice: "false",
    company_name: "nowamoda",
    street: "majchrzaka 2",
    postal_code: "23-045",
    tax_id: "2343453455",
    terms_n_conditions: "true",
    city: "warszawa",
  }

  const charge = {
    id: "ch_1IEmNhIi89l05IdyBY3cOyZ9",
    object: "charge",
    amount: 3900,
    amount_captured: 3900,
    amount_refunded: 0,
    application: null,
    application_fee: null,
    application_fee_amount: null,
    balance_transaction: "txn_1IEmNiIi89l05IdyBXx4H759",
    billing_details: {
      address: {
        city: "Pilawa",
        country: "PL",
        line1: "Aleja Wyz",
        line2: null,
        postal_code: "08-440",
        state: null,
      },
      email: "test-68a380@test.mailgenius.com",
      name: "Szymon",
      phone: null,
    },
    calculated_statement_descriptor: "MEALPREP",
    captured: true,
    created: 1611886001,
    currency: "eur",
    customer: "cus_IqTIJQlPaqEyJt",
    description: null,
    destination: null,
    dispute: null,
    disputed: false,
    failure_code: null,
    failure_message: null,
    fraud_details: {},
    invoice: null,
    livemode: false,
    metadata: {},
    on_behalf_of: null,
    order: null,
    outcome: {
      network_status: "approved_by_network",
      reason: null,
      risk_level: "normal",
      risk_score: 13,
      seller_message: "Payment complete.",
      type: "authorized",
    },
    paid: true,
    payment_intent: "pi_1IEmNLIi89l05Idy3TFtUlYm",
    payment_method: "pm_1IEmNgIi89l05IdyXiPLsn2N",
    payment_method_details: {
      card: {
        brand: "visa",
        checks: [Object],
        country: "US",
        exp_month: 2,
        exp_year: 2034,
        fingerprint: "WnrrvxKm3N2l1nSx",
        funding: "credit",
        installments: null,
        last4: "4242",
        network: "visa",
        three_d_secure: null,
        wallet: null,
      },
      type: "card",
    },
    receipt_email: "test-68a380@test.mailgenius.com",
    receipt_number: null,
    receipt_url:
      "https://pay.stripe.com/receipts/acct_1H9Tu7Ii89l05Idy/ch_1IEmNhIi89l05IdyBY3cOyZ9/rcpt_IqTKUmsR7cL7c3OLnuT22XBapz8S8v7",
    refunded: false,
    refunds: {
      object: "list",
      data: [],
      has_more: false,
      total_count: 0,
      url: "/v1/charges/ch_1IEmNhIi89l05IdyBY3cOyZ9/refunds",
    },
    review: null,
    shipping: {
      address: {
        city: "Pilawa",
        country: "PL",
        line1: "Aleja Wyz",
        line2: null,
        postal_code: "08-440",
        state: "",
      },
      carrier: null,
      name: "Szymon",
      phone: null,
      tracking_number: null,
    },
    source: null,
    source_transfer: null,
    statement_descriptor: null,
    statement_descriptor_suffix: null,
    status: "succeeded",
    transfer_data: null,
    transfer_group: null,
  }

  return (
    <div style={{ width: "100%" }}>
      <center className="mail-wrapper">
        <div className="mail-webkit">
          <table className="mail-outer">
            <td style={{ borderBottom: "1px solid rgba(0,0,0)" }}>
              <tr className="mail-header">
                <td>
                  <table>
                    <tr>
                      <td style={{ textAlign: "cetner" }}>
                        <h2 className="mail-logotype">TheCraftsmanJohn</h2>
                      </td>
                    </tr>
                  </table>
                </td>
                <td>
                  <p className="mail-header_charge-id">{charge.id}</p>
                </td>
              </tr>
            </td>
          </table>
        </div>
      </center>
    </div>
  )
}

export default Mail
