const { DataTypes} = require("sequelize");


module.exports = (sequelize) => {
  sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_user"
      },
      n_document: {
        type: DataTypes.STRING,
      },
      id_type: {
        type: DataTypes.STRING
      },
      first_name: {
        type: DataTypes.STRING
      },
      last_name: {
        type: DataTypes.STRING
      },
      nameCompany: {
        type: DataTypes.STRING
      },
      commercialName: {
        type: DataTypes.STRING
      },
      person_type: {
        type: DataTypes.STRING
      },  
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      city_code: {
        type: DataTypes.STRING,
      },
      state_code: {
        type: DataTypes.STRING,
      },
      res_ped: {
        type: DataTypes.FLOAT,
        defaultValue: 0
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true, 
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
