const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Product',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: 'id_product',
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      account_group: {
        type: DataTypes.FLOAT
      },
      type: {
        type: DataTypes.STRING
      },
      stock_control : {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      tax_classification: {
        type: DataTypes.STRING,
        defaultValue: "Taxed"
      },
      tax_included: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      tax_consumption_value: {
        type: DataTypes.FLOAT
      },
      id_taxes : {
        type: DataTypes.FLOAT
      },
      currency_code: {
        type: DataTypes.STRING
      },
      price_list_position	: {
        type: DataTypes.FLOAT
      },
      unit: {
        type: DataTypes.STRING
      },
      tariff: {
        type: DataTypes.STRING
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      countInStock: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          is: /^[A-Za-z0-9\-]+$/, // Validación alfanumérica con guiones
          notEmpty: true, // No permitir espacios en blanco
        },
      },
    },
    {
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['code'],
        },
      ],
    }
  );
};
