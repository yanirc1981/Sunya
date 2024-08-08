const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'StoreProduct',
    {
      storeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Stores',
          key: 'id_store',
        },
        field: 'store_id',
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Products',
          key: 'id_product',
        },
        field: 'product_id',
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      tableName: 'store_products',
      timestamps: false,
    }
  );
};
