const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('token', {
    userId: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',  // Reference to 'user' model
        key: 'id'
      }
    },
    otpNo: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    expiryTime: {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
    }
  });
};
