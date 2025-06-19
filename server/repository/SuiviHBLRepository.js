const Suivi = require("../models/SuiviHBL");
const { Sequelize, literal, where } = require('sequelize');

class SuiviRepository  {
  async create(Data) {
    return await Suivi.create(Data);
  }
  async findById(id) {
    return await Suivi.findByPk(id);
  }
  async plusExpedier() {
    const totalCount = await Suivi.count();

    return await Suivi.findAll({
      attributes: [
        "nature",
        [Sequelize.fn("COUNT", Sequelize.col("nature")), "nb"],
        [literal(`(COUNT(nature) / ${totalCount} * 100)`), 'pourcentage']
      ],
      group: "nature",
      order: [[Sequelize.literal("nb"), "DESC"]],
      limit: 5, // LIMIT 5
    });
  }
  async findAll() {
    return await Suivi.findAll();
  }
  async update(id, SuiviData) {
    const suivi = await this.findById(id);
    if (suivi) {
      return await Suivi.update(SuiviData, {
        where: { idSuiviHBL: id },
      });
    }
    return null;
  }
  async delete(id) {
    const Suivi = await this.findById(id);
    if (Suivi) {
      return await Suivi.destroy({ where: { idSuiviHBL: id } });
    }
    return null;
  }
  async suivi(numHBL){
    return await Suivi.findAll({
      where:{
        numHBL : numHBL
      }
    })
  }
}

module.exports = SuiviRepository;
