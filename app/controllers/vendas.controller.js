const db = require("../models");
const Venda = db.vendas;
const Op = db.Sequelize.Op;

// Create and Save a new Venda
exports.create = (req, res) => {
  // Validate request
  if (!req.body.vendedor) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Venda
  const venda = {
    vendedor: req.body.vendedor,
    cliente: req.body.cliente,
    preco: req.body.preco ? req.body.preco : false
  };

  // Save Venda in the database
  Venda.create(venda)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Venda."
      });
    });
};

// Retrieve all Vendas from the database.
exports.findAll = (req, res) => {
  const vendedor = req.query.vendedor;
  var condition = vendedor ? { vendedor: { [Op.like]: `%${vendedor}%` } } : null;

  Venda.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving vendas."
      });
    });
};

// Find a single Venda with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Venda.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Venda with id=" + id
      });
    });
};

// Update a Venda by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Venda.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Venda was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Venda with id=${id}. Maybe Tenda was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Venda with id=" + id
      });
    });
};

// Delete a Venda with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Venda.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Venda was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Venda with id=${id}. Maybe Tenda was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Venda with id=" + id
      });
    });
};

// Delete all Vendas from the database.
exports.deleteAll = (req, res) => {
  Venda.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Vendas were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all vendas."
      });
    });
};

// find all preco Venda
exports.findAllpreco = (req, res) => {
  Venda.findAll({ where: { preco: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving vendas."
      });
    });
};
