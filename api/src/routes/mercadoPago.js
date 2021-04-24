const server = require("express").Router()
// SDK
const mercadopago = require ('mercadopago');
// Credenciales
mercadopago.configure({
  access_token: process.env.MP_TOKEN
});

server.post('/checkout', async (req, res) => {
  const { cart, infoUser } = req.body
  

  const cartMP = cart.map(product => ({
    title: product.title,
    unit_price: product.price,
    quantity: product.quantity,
    currency_id: "USD"
  }))

  let preference = {
    payer:{
      phone: {area_code:"54",number:222},
      email: `${infoUser.email}.TechStore`,
      name: infoUser.name,
      surname: infoUser.surname,
      address: {zip_code:"asd", street_name:"nnono", street_number:222}
    },
    //external_reference : `${orderId}.${userId}`,
		items: cartMP,
		back_urls: {
			"success": "http://localhost:3000",
			"failure": "http://localhost:3000",
			"pending": "http://localhost:3000"
		},
		auto_return: 'approved',
    shipments: {
      receiver_address: {
        zip_code: '',
        street_name: '',
        street_number: 1,
        floor: '',
        apartment: '',
        
      }
    }
	};

  try {
    let response = await mercadopago.preferences.create(preference)
    res.json({redirect :response.body.init_point})
  } catch(err) {
    res.sendStatus(404)
  }
})



server.get('/feedback', function(request, response) {
  console.log({
    Payment: request.query.payment_id,
    Status: request.query.status,
    MerchantOrder: request.query.merchant_order_id
  })
  return response.json({
   Payment: request.query.payment_id,
   Status: request.query.status,
   MerchantOrder: request.query.merchant_order_id
 })
});

module.exports = server