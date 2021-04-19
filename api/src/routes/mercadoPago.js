const server = require("express").Router()
// SDK
const mercadopago = require ('mercadopago');
// Credenciales
mercadopago.configure({
  access_token: process.env.MP_TOKEN
});

server.post('/checkout', async (req, res) => {
  const { products } = req.body

  let preference = {
    back_urls: {
      'success': 'http://localhost:3000/',
      'failure': 'http://localhost:3000/',
      'pending': 'http://localhost:3000/'
    },
    auto_return: 'approved',
    items: []
  }

  products.map(product => {
    preference = {
      ...preference,
      items: [...preference.items,
        {
          title: product.title,
          unit_price: product.unit_price,
          quantity: product.quantity
        }
      ]
    }
  })

  try {
    let response = await mercadopago.preferences.create(preference)
    console.log(response.body)
    res.redirect(response.body.init_point)
  } catch(err) {
    res.sendStatus(404)
  }
})

module.exports = server
