const MAWB = require("../models/MAWB");
const HAWB = require("../models/HAWB");
const Client = require("../models/Client");
const sequelize = require('../config/database')
const { fn, col, where,Sequelize } = require("sequelize");

class HAWBRepository {
  async create(Data) {
    return await HAWB.create(Data);
  }
  async findById(id) {
    return await HAWB.findByPk(id);
  }
  async findAll() {
    return await HAWB.findAll({
      attributes: [
        "idHAWB",
        "numHAWB",
        "dateEmmission",
        "idMAWB",
        "nbColis",
        "poid",
        "volume",
        "description",
      ],
      include: [
        {
          model: MAWB,
          attributes: ["idMAWB", "numMAWB"],
          required: true, // pour forcer la jointure
        },
        {
          model: Client,
          as: "clientExp", // alias pour l'agent expéditeur
          attributes: ["idClient", "nomClient"],
          required: true, // pour forcer la jointure
        },
        {
          model: Client,
          as: "clientDest", // alias pour l'agent destinataire
          attributes: ["idClient", "nomClient"],
          required: true, // pour forcer la jointure
        },
      ],
    });
  }
  async countAll() {
    return await HAWB.count();
  }
  async countAllOnYear() {
    return await HAWB.count({
      where: Sequelize.where(
        fn("YEAR", col("dateEmmission")),
        new Date().getFullYear()
      ),
    });
  }
  async countByMonth() {
    const results = await sequelize.query(
      `
      SELECT 
        DATE_FORMAT(dateEmmission, '%M') AS mois, 
        COUNT(*) AS Aerienne
      FROM hawbs
      WHERE YEAR(dateEmmission) = YEAR(CURRENT_DATE)
      GROUP BY mois;
    `,
      { type: sequelize.QueryTypes.SELECT }
    );
    return results;
  }
  async findAllByMaster(id) {
    return await HAWB.findAll({
      where: {
        idMAWB: id,
      },
      attributes: [
        "idHAWB",
        "numHAWB",
        "dateEmmission",
        "nbColis",
        "poid",
        "volume",
      ],
      include: [
        {
          model: MAWB,
          attributes: ["numMAWB"],
          required: true, // pour forcer la jointure
        },
        {
          model: Client,
          as: "clientExp", // alias pour l'agent expéditeur
          attributes: ["nomClient"],
          required: true, // pour forcer la jointure
        },
        {
          model: Client,
          as: "clientDest", // alias pour l'agent destinataire
          attributes: ["nomClient"],
          required: true, // pour forcer la jointure
        },
      ],
    });
  }
  async totalColis(id) {
    return await HAWB.findAll({
      where: {
        idMAWB: id,
      },
      attributes: [
        [fn("SUM", col("nbColis")), "totalNbColis"],
        [fn("SUM", col("poid")), "totalPoid"],
        [fn("SUM", col("volume")), "totalVolume"],
      ],
    });
  }
  async findByNum(num) {
    return await HAWB.findOne({
      where: {
        numHAWB: num,
      },
      include: [
        {
          model: MAWB,
          attributes: ["numMAWB"],
          required: true, // pour forcer la jointure
        },
        {
          model: Client,
          as: "clientExp", // alias pour l'agent expéditeur
          attributes: ["nomClient"],
          required: true, // pour forcer la jointure
        },
        {
          model: Client,
          as: "clientDest", // alias pour l'agent destinataire
          attributes: ["nomClient"],
          required: true, // pour forcer la jointure
        },
      ],
    });
  }
  async update(id, HAWBData) {
    const hAWB = await this.findById(id);
    if (hAWB) {
      return await HAWB.update(HAWBData, { where: { idHAWB: id } });
    }
    return null;
  }
  async delete(id) {
    const hAWB = await this.findById(id);
    if (hAWB) {
      return await HAWB.destroy({ where: { idHAWB: id } });
    }
    return null;
  }
}

module.exports = HAWBRepository;
