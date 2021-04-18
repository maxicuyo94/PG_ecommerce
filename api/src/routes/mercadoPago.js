const server = require("express").Router()
// SDK
const mercadopago = require ('mercadopago');

mercadopago.configure({
  access_token: process.env.MP_TOKEN
});

server.post('/', async (req, res) => {
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
    const response = await mercadopago.preferences.create(preference)
    global.id = response.body.id
  } catch(err) {
    res.sendStatus(404)
  }

})