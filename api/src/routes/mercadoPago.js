const server = require("express").Router()
require("dotenv").config();

const mercadopago = require ('mercadopago');
const {userMail} = require ('../util/email')
// Credenciales
mercadopago.configure({
  access_token: process.env.MP_TOKEN
});

server.post('/checkout', async (req, res) => {
  const { cart, infoUser, discount } = req.body
  const cartMP = cart.map(product => ({
    title: product.title,
    unit_price: product.price*(1-discount),
    quantity: product.quantity,
    currency_id: "ARS"
  }))

  console.log(infoUser)

  let preference = {
    payer:{
      phone: {area_code:"54",number:infoUser.phone},
      email: `${infoUser.email}.TechStore`,
      name: infoUser.name,
      surname: infoUser.surname,
      address: {
        zip_code:infoUser.addres.postalCode, 
        street_name:infoUser.addres.streetName, 
        street_number:infoUser.addres.streetNumber
      }
    },
    external_reference : `${infoUser.email},${infoUser.id},${infoUser.addres.streetName},${infoUser.addres.streetNumber},${infoUser.addres.postalCode},${infoUser.name},${infoUser.surname},${discount}`,
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

server.post('/send', (req,res)=>{
    const user = req.query
      userMail(user)
})

module.exports = server