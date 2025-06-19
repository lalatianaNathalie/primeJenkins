const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const MAWB = require("./MAWB");
const Employe = require("./Employe");
const Client = require("./Client");

class HAWB extends Sequelize.Model {}

HAWB.init(
  {
    idHAWB: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    numHAWB: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Ce numéro HAWB est déjà utilisée.",
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
    idMAWB: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: MAWB,
        key: "idMAWB",
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
    modelName: "HAWB",
    timestamps: true,
    validate: {
      expediteurDifferentDeDestinateur() {
        if (this.idExpediteur === this.idDestinateur) {
          throw new Error("idExpediteur doit être différent de idDestinateur.");
        }
      },
    },
  }
);
HAWB.belongsTo(Client, { as: "clientExp", foreignKey: "idExpediteur" });
HAWB.belongsTo(Client, { as: "clientDest", foreignKey: "idDestinataire" });
HAWB.belongsTo(MAWB, { foreignKey: "idMAWB" });

module.exports = HAWB;
