const { DataTypes, INTEGER } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("order", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    state: {
      type: DataTypes.ENUM("created", "processing", "completed", "canceled"),
      defaultValue: "created",
      allowNull: false,
    },
    amount: {
      type: INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
      },
    },
    paymentMethod: {
      type: DataTypes.ENUM("Mercado Pago"),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      varchar: 255,
      allowNull: false,
    },
    postalCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
