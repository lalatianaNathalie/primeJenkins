const Suivi = require("../models/SuiviHAWB");
const { Sequelize, literal } = require('sequelize');

class SuiviRepository  {
  async create(Data) {
    return await Suivi.create(Data);
  }
  async findById(id) {
    return await Suivi.findByPk(id);
  }
  async findAll() {
    return await Suivi.findAll();
  }
  async update(id, SuiviData) {
    const suivi = await this.findById(id);
    if (suivi) {
      return await Suivi.update(SuiviData, {
        where: { idSuiviHWB: id },
      });
    }
    return null;
  }
  async delete(id) {
    const Suivi = await this.findById(id);
    if (Suivi) {
      return await Suivi.destroy({ where: { idSuiviHWB: id } });
    }
    return null;
  }
  async suivi(numHWB){
    return await Suivi.findAll({
      where:{
        numHAWB : numHWB
      }
    })
  }
}

module.exports = SuiviRepository;
 