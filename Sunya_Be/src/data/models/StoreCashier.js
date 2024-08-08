const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'StoreCashier',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      storeId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'stores',
          key: 'id',
        },
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id_user',
        },
        allowNull: false,
      },
    },
    {
      tableName: 'store_cashiers',
      timestamps: false,
    }
  );
};
