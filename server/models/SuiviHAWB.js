const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const HAWB = require('./HAWB')
class SuiviHAWB extends Sequelize.Model {}
SuiviHAWB.init(
  {
    idSuiviHAWB: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    numHAWB: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: HAWB,
        key: "numHAWB",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    etape: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateEtape:{
      type: DataTypes.DATE,
      allowNull: false,
    },
    status:{
      type: DataTypes.STRING,
      allowNull: false
    },
    commentaire:{
      type: DataTypes.STRING,
      allowNull: true
    },
    creerPar: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    modifierPar: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "SuiviHWB",
    timestamps: true ,
    indexes: [
      {
        unique: true,
        fields: ["numHAWB", "etape"]
      }
    ]
  }
);

module.exports = SuiviHAWB;
