const TransAerienne = require('../models/TransAerienne');

class TransAerienneRepository  {
  async create(Data) {
    return await TransAerienne.create(Data);
  }
  async findById(id) {
    return await TransAerienne.findByPk(id);
  }
  async findByNumVol(numVol) {
    return await TransAerienne.findOne({ where: { numVol: numVol } });
  }
  async searchAll(word) {
    return await Client.findAll({
      where: {
        [Op.or]: [
          { numVol: { [Op.like]: `%${word}%` } },
          { nomCompagnie: { [Op.like]: `%${word}%` } },
          { dateChargement: { [Op.like]: `%${word}%` } },
          { paysChargement: { [Op.like]: `%${word}%` } },
          { villeChargement: { [Op.like]: `%${word}%` } },
          { dateDechargement: { [Op.like]: `%${word}%` } },
          { paysDechargement: { [Op.like]: `%${word}%` } },
          { villeDechargement: { [Op.like]: `%${word}%` } },
        ],
      },
    });
  }
  async findAll() {
    return await TransAerienne.findAll();
  }
  async update(id, transAerienneData) {
    const transAerienne = await this.findById(id);
    if (transAerienne) {
      return await TransAerienne.update(transAerienneData,{where: { idTransAerienne: id }});
    }
    return null;
  }
  async delete(id) {
    const transAerienne = await this.findById(id);
    if (transAerienne) {
      return await TransAerienne.destroy({where: { idTransAerienne: id }});
    }
    return null;
  }
}

module.exports = TransAerienneRepository;
