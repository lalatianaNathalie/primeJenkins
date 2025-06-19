const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 
class Employe extends Sequelize.Model {}
Employe.init(
  {
    idEmploye: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nomEmploye: {
      type: DataTypes.STRING,
      allowNull: false
    },
    emailEmploye: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    motDePasse: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    typeEmploye: {
      type: DataTypes.ENUM('Employe', 'Administrateur'),
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Employe',
    timestamps: true, 
  }
);
module.exports = Employe;
