const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const TransportAerienne = require("./TransAerienne");
const Employe = require("./Employe");

class MAWB extends Sequelize.Model {}

MAWB.init(
  {
    idMAWB: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    numMAWB: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Le Numero MAWB est déjà appartient au autre MAWB",
      },
    },
    idTransport: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: TransportAerienne,
        key: "idTransAerienne",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    dateEmission: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dateArrivePrevue: {
      type: DataTypes.DATE,
      allowNull: true,
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
    modelName: "MAWB",
    timestamps: true,
  }
);

// Associations
MAWB.belongsTo(TransportAerienne, { foreignKey: 'idTransport' });
MAWB.belongsTo(Employe, { foreignKey: 'creerPar', as: 'Creator' });
MAWB.belongsTo(Employe, { foreignKey: 'modifierPar', as: 'Modifier' });

module.exports = MAWB;
