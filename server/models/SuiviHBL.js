const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const HBL = require('./HBL')
class SuiviHBL extends Sequelize.Model {}
SuiviHBL.init(
  {
    idSuiviHBL: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    numHBL: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: HBL,
        key: "numHBL",
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
    }
  },
  {
    sequelize,
    modelName: "SuiviHBL",
    timestamps: true ,
    indexes: [
      {
        unique: true,
        fields: ["numHBL", "etape"]
      }
    ]
  }
);

module.exports = SuiviHBL;
