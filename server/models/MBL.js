const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const TransportMaritime = require("./TransMaritime");
const Employe= require("./Employe");


class MBL extends Sequelize.Model {}

MBL.init(
  {
    idMBL: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    numMBL: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Le Numero MBL est déjà appartient au autre MBL",
      },
    },
    idTransport: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: TransportMaritime,
        key: "idTransMaritime",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    dateEmission:{
        type:DataTypes.DATE,
         allowNull:false
     },
    dateArrivePrevue:{
        type:DataTypes.DATE,
         allowNull:false
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
    modelName: "MBL",
    timestamps: true,
  }
);


MBL.belongsTo(TransportMaritime, { foreignKey: 'idTransport' });

module.exports = MBL;
