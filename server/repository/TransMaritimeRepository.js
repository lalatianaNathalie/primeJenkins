const TransMaritime = require('../models/TransMaritime');

class TransMaritimeRepository  {
  async create(Data) {
    return await TransMaritime.create(Data);
  }
  async findById(id) {
    return await TransMaritime.findByPk(id);
  }
  async findByNumIMO(numIMO) {
    return await TransMaritime.findOne({ where: { numIMO: numIMO } });
  }
  async searchAll(word) {
    return await Client.findAll({
      where: {
        [Op.or]: [
          { numIMO: { [Op.like]: `%${word}%` } },
          { nomNavire: { [Op.like]: `%${word}%` } },
          { nomBateau: { [Op.like]: `%${word}%` } },
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
    return await TransMaritime.findAll();
  }
  async update(id, transMaritimeData) {
    const transMaritime = await this.findById(id);
    if (transMaritime) {
      return await TransMaritime.update(transMaritimeData , { where: { idTransMaritime: id } });
    }
    return null;
  }
  async delete(id) {
    const transMaritime = await this.findById(id);
    if (transMaritime) {
      return await TransMaritime.destroy({where: { idTransMaritime: id }});
    }
    return null;
  }
}


module.exports = TransMaritimeRepository;
