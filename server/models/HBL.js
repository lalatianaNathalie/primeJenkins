const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const MBL= require("./MBL");
const Employe= require("./Employe");
const Client = require("./Client");

class HBL extends Sequelize.Model {}

HBL.init(
  {
    idHBL: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    numHBL: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Ce numéro HBL est déjà utilisé.",
      },
    },
    nbColis: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    poid: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    volume: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    idMBL: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: MBL,
        key: "idMBL",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    dateEmmission: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    idExpediteur: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Client,
        key: "idClient",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    idDestinataire: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Client,
        key: "idClient",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    creerPar: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Employe,
        key: "idEmploye",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    modifierPar: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Employe,
        key: "idEmploye",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "HBL",
    timestamps: true,
    validate: {
      expediteurDifferentDeDestinataire() {
        if (this.idExpediteur === this.idDestinataire) {
          throw new Error("idExpediteur doit être différent de idDestinataire.");
        }
      },
    },
  }
);

// Définir les associations
HBL.belongsTo(Client, { as: 'clientExp', foreignKey: 'idExpediteur' });
HBL.belongsTo(Client, { as: 'clientDest', foreignKey: 'idDestinataire' });
HBL.belongsTo(MBL, { foreignKey: 'idMBL' });

module.exports = HBL;
