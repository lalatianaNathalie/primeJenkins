const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Assure-toi d'avoir la connexion dans ce fichier

class Client extends Sequelize.Model {}

Client.init(
  {
    idClient: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nomClient: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emailClient: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'L\'adresse email est déjà utilisée.' 
      },
      validate: {
        isEmail: {
          msg: 'Veuillez fournir une adresse email valide.'
        }
      }
    },
    telClient: {
      type: DataTypes.STRING,
      allowNull: true, 
      unique: {
        msg: 'ce numéro telephone est déjà utilisée.' 
      },   
    },
    adresseClient: {
      type: DataTypes.STRING,
      allowNull: true,    
    },
    CINClient : {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Le Numero CIN est déjà appartient au autre persone'
      }
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
    modelName: "Client",
    timestamps: true, // Inclut createdAt et updatedAt
  }
);

module.exports = Client;
