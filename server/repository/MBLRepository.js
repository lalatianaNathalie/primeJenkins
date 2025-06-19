const MBL = require("../models/MBL");
const TransMaritime = require("../models/TransMaritime");

class MBLRepository  {
  async create(TransactionData) {
    return await MBL.create(TransactionData);
  }
  async countAll() {
    return await MBL.count();
  }
  async findById(id) {
    return await MBL.findByPk(id);
  }
  async getById(id) {
    return await MBL.findOne( {
      where:{
        idMBL : id
      },
      attributes: [
        'idMBL',
        'numMBL',
        'dateEmission',
        'dateArrivePrevue',
      ],
      include: [
        {
          model: TransMaritime,
          attributes: [
            'idTransMaritime',
            'numIMO',
            'armateur',
            'nomNavire',
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
  async findByMere(mbl) {
    return await MBL.findOne({ where: { numMBL: mbl } });
  }
  async findAll() {
    return await MBL.findAll(
      {
        attributes: [ 
          'idMBL',
          'numMBL',
          'dateEmission',
          'dateArrivePrevue',
        ],
        include: [
          {
            model: TransMaritime,
            attributes: [
              "idTransMaritime",
              'numIMO',
              'armateur',
              'nomNavire',
              'dateChargement',
              'paysChargement',
              'paysDechargement',
            ],
            required: true, // pour forcer la jointure
          }
        ],
      }
    );
  }
  async update(id, TransactionData) {
    const transaction = await this.findById(id);
    if (transaction) {
      return await MBL.update(TransactionData,{where: { idMBL: id }});
    }
    return null;
  }
  async delete(id) {
    const transaction = await this.findById(id);
    if (transaction) {
      return await MBL.destroy({ where: { idMBL: id } });
    }
    return null;
  }
}

module.exports = MBLRepository;
