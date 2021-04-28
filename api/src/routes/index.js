const { Router } = require("express");
const mercadopago = require('./mercadoPago')
const router = Router();
router.use("/mercadopago", mercadopago);


module.exports = router;