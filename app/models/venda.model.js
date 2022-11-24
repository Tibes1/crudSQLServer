module.exports = (sequelize, Sequelize) => {
  const Venda = sequelize.define("venda", {
    vendedor: {
      type: Sequelize.STRING
    },
    cliente: {
      type: Sequelize.STRING
    },
    preco: {
      type: Sequelize.FLOAT
    }
  });

  return Venda;
};
