const { Op, where } = require("sequelize");
const Conteneur = require("../models/Conteneur");

class ConteneurRepository  {
  async create(ConteneurData) {
    return await Conteneur.create(ConteneurData);
  }

  async findById(id) {
    return await Conteneur.findByPk(id);
  }
  async findAll() {
    return await Conteneur.findAll();
  }
  async findAllWithMBL(mbl) {
    return await Conteneur.findAll({where:
      {numMBL:mbl}
    });
  }
  async update(id, ConteneurData) {
    const conteneur = await this.findById(id);
    if (conteneur) {
      return await Conteneur.update(ConteneurData,{ where: { idConteneur: id } });
    }
    return null;
  }

  async delete(id) {
    const conteneur = await this.findById(id);
    if (conteneur) {
      return await Conteneur.destroy({ where: { idConteneur: id } });
    }
    return null;
  }
}

module.exports = ConteneurRepository;
