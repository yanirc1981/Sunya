const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Customer',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: 'id_customer',
      },
      id_siigo: {
        type: DataTypes.STRING
      },
      identification: {
        type: DataTypes.STRING,
      },
      first_name: {
        type: DataTypes.STRING,
      },
      last_name: {
        type: DataTypes.STRING,
      },
      nameCompany: {
        type: DataTypes.STRING,
      },
      commercialName: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.STRING,
        defaultValue: 'Customer',
      },
      person_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      check_digit: {
        type: DataTypes.STRING,
      },
      branch_office: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      vat_responsible: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      fiscal_responsibilities_code: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'R-99-PN',
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country_code: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Co',
      },
      state_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postal_code: {
        type: DataTypes.STRING,
      },
      indicative: {
        type: DataTypes.STRING,
      },
      number: {
        type: DataTypes.STRING,
      },
      extension: {
        type: DataTypes.STRING,
      },
      first_name_contact: {
        type: DataTypes.STRING,
      },
      last_name_contact: {
        type: DataTypes.STRING,
      },
      email_contact: {
        type: DataTypes.STRING,
        
        validate: {
          isEmail: true,
        },
      },
      indicative_contact: {
        type: DataTypes.STRING,
      },
      phone_contact: {
        type: DataTypes.STRING,
      },
      extension_contact: {
        type: DataTypes.STRING,
      },
      seller_id: {
        type: DataTypes.FLOAT,
      },
      collector_id: {
        type: DataTypes.FLOAT,
      },
      res_ped: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      paranoid: true,
    }
  );
};
