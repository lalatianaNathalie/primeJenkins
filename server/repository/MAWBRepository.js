const MAWB = require("../models/MAWB");
const TransAerienne = require("../models/TransAerienne");

class MAWBRepository {
  async create(TransactionData) {
    return await MAWB.create(TransactionData);
  }
  async countAll() {
    return await MAWB.count();
  }
  async findById(id) {
    return await MAWB.findByPk(id);
  }
  async getById(id) {
    return await MAWB.findOne( {
      where:{
        idMAWB : id
      },
      attributes: [
        'idMAWB',
        'numMAWB',
        'dateEmission',
        'dateArrivePrevue',
      ],
      include: [
        {
          model: TransAerienne,
          attributes: [
            'idTransAerienne',
            'numVol',
            'nomCompagnie',
            'dateChargement',
            'villeChargement',
            'paysChargement',
            'paysDechargement',
            'villeDechargement'
          ],
          required: true, // pour forcer la jointure
        }
      ],
    })  
  }
  async findByMere(mawb) {
    return await MAWB.findOne({ where: { numMAWB: mawb } });
  }
  async findAll() {
    return await MAWB.findAll({
      attributes: ["idMAWB", "numMAWB", "dateEmission", "dateArrivePrevue"],
      include: [
        {
          model: TransAerienne,
          attributes: [
            "idTransAerienne",
            "numVol",
            "nomCompagnie",
            "dateChargement",
            "paysChargement",
            "paysDechargement",
          ],
          required: true, // pour forcer la jointure
        },
      ],
    });
  }
  async update(id, TransactionData) {
    const transaction = await this.findById(id);
    if (transaction) {
      return await MAWB.update(TransactionData, { where: { idMAWB: id } });
    }
    return null;
  }
  async delete(id) {
    const transaction = await this.findById(id);
    if (transaction) {
      return await MAWB.destroy({ where: { idMAWB: id } });
    }
    return null;
  }
}

module.exports = MAWBRepository;
