const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Order',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      orderItems: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      shippingAddress: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      paymentId: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      paymentResult: {
        type: DataTypes.JSONB,
      },
      delivery: {
        type: DataTypes.JSONB,
      },
      itemsPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      shippingPrice: {
        type: DataTypes.FLOAT,
      },
      taxPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', 
          key: 'id_user',
        },
      },
      id_customer: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Customers', 
          key: 'id_customer', 
        },
      },
      isPaid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      paidAt: {
        type: DataTypes.DATE,
      },
      isDelivered: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      deliveredAt: {
        type: DataTypes.DATE,
      },
      isInvoice: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      idInvoice: {
        type: DataTypes.STRING,
      },
      invoiceAt: {
        type: DataTypes.DATE,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      timestamps: true,
      underscored: true,
    }
  );
};
