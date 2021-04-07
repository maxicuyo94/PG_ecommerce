const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo y le injectamos la conexion a Sequelize

module.exports = (sequelize) => {
  // Definimos el modelo
  sequelize.define('product', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      varchar: 200,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      varchar: 20000,
      allowNull: false,
    },
    picture: {
      type: DataTypes.STRING,
      varchar: 2000,
    },
    stock: {
      type: DataTypes.INTEGER,
      char: 10,
    },
    barCode: {
      type: DataTypes.INTEGER,
      char: 20,
    },
    price: {
      type: DataTypes.FLOAT,
      char: 15,
    },
    availableSize: {
      type: DataTypes.FLOAT,
    },
   availableColor: {
      type: DataTypes.ENUM('aprobada', 'cancelada', 'rechazada'),
    },
    discount: {
      type: DataTypes.BOOLEAN,
    },
    weight: {
      type: DataTypes.FLOAT,
    },
    ranking: {
      type: DataTypes.INTEGER,
      char: 200,
    },
    })
  };