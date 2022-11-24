module.exports = app => {
  const vendas = require("../controllers/vendas.controller.js");

  var router = require("express").Router();

  // Create a new Venda
  router.post("/", vendas.create);

  // Retrieve all Vendas
  router.get("/", vendas.findAll);

  // Retrieve a single Venda with id
  router.get("/:id", vendas.findOne);

  // Update a Venda with id
  router.put("/:id", vendas.update);

  // Delete a Venda with id
  router.delete("/:id", vendas.delete);

  // Delete all Vendas
  router.delete("/", vendas.deleteAll);

  app.use('/api/vendas', router);
};
