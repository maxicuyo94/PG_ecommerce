const server = require("express").Router();
const Sequelize = require("sequelize");
const { Product, Category } = require("../db.js");
const Op = Sequelize.Op;

server.get("/", (req, res, next) => {
  Product.findAll({ include: { model: Category } })
    .then((products) => {
      res.send(products);
    })
    .catch(next);
});

server.post("/newProduct", async (req, res) => {
  let {
    name,
    images,
    stock,
    price,
    model,
    brand,
    ranking,
    description,
    status,
    categories,
  } = req.body;

  categories = categories.split(",");

  categories = await Promise.all(
    categories.map(
      async (category) =>
        await Category.findAll({
          include: { model: Product },
          where: {
            name: { [Op.iLike]: `${category}` },
          },
        })
    )
  );

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
      status,
    });

    categories.map(async (category) => await products.setCategories(category));

    res.send("New product");
  } catch (e) {
    res.sendStatus(404);
  }
});

module.exports = server;
