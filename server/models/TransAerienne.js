const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Assure-toi d'avoir la connexion dans ce fichier

class TransAerienne extends Sequelize.Model {}

TransAerienne.init(
  {
    idTransAerienne: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    numVol: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Le numero de vol est déjà existé.' 
      },
    },
    nomCompagnie: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateChargement: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    paysChargement:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    villeChargement:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    paysDechargement:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    villeDechargement:{
      type:DataTypes.STRING,
      allowNull:true, 
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
    modelName: "TransAerienne",
    timestamps: true, // Inclut createdAt et updatedAt
  }
);

module.exports = TransAerienne;
