const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo y le injectamos la conexion a Sequelize

module.exports = (sequelize) => {
    // Definimos el modelo
    sequelize.define('category', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    })
};