const Sequelize = require('sequelize');
const {v4: uuidv4} = require("uuid");



module.exports = (sequelize) => {
 return sequelize.define('user', {
    id: {
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    firstName: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber : {
      type: Sequelize.DataTypes.STRING(12),
  allowNull: false
    },
    email: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    gender: {
      type: Sequelize.DataTypes.ENUM("male", "female"),
      allowNull: false
    },
    password: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: Sequelize.DataTypes.ENUM('admin', 'patient', 'provider'),  
      allowNull: false,
      defaultValue: 'patient',
    },
    emergencyContactName: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true
    },
    emergencyContactInfo: {
      type: Sequelize.DataTypes.STRING, // Changed from NUMBER to STRING
      allowNull: true
    },
    emergencyContactRelationship: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true
    },
    medicalHistory: {
      type: Sequelize.DataTypes.JSON,
      allowNull: true
    },
    surgicalHistory: {
      type: Sequelize.DataTypes.JSON,
      allowNull: true
    },
    bloodGroup: {
      type: Sequelize.DataTypes.ENUM("O+", "O-", "B", "AB", "A"),
      allowNull: true
    },
    genotype: {
      type: Sequelize.DataTypes.ENUM("AA", "AS", "SS", "AC"),
      allowNull: true
    },
    isVerified: {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false
    } ,
    isSuspended : {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
};


