const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Token", {
    access_token: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      expires_in: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      received_at: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });
};
