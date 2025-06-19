const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const MBL = require("./MBL");

class Conteneur extends Sequelize.Model {}
Conteneur.init(
  {
    idConteneur: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    numConteneur: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    typeConteneur: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numPlomb: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numMBL: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: MBL,
        key: "numMBL",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    } 
  },
  {
    sequelize,
    modelName: "Conteneur",
    timestamps: true,
  }
);
Conteneur.belongsTo(MBL, { foreignKey: "numMBL" });

module.exports = Conteneur;
