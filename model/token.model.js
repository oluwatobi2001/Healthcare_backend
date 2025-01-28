const Sequelize = require('sequelize');
const {v4: uuidv4} = require("uuid")



module.exports = (sequelize) => {
  return sequelize.define('token', {
    id: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.DataTypes.UUIDV4,
      primaryKey : true
    },

    userId: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',  // Reference to 'user' model
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
