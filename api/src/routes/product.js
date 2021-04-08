const server = require('express').Router();
const { Product } = require('../db.js');

server.get('/', (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
});

server.post('/newProduct', (req, res) => {
	const { name, images, stock, price, model, brand, ranking, description, status, category } = req.body;
	let description = JSON.parse(description)

	try {
		let products = await Product.create({
			name,
			images,
			stock,
			price,
			model,
			brand,
			ranking,
			description,
			status
		});

		//let category = await findAll({});
		await products.setCategories(category)

		res.send("New product")
	} catch (e) {
		res.sendStatus(404)
	}

});

module.exports = server;
