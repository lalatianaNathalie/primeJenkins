const { Op } = require("sequelize");
const Client = require("../models/Client");

class ClientRepository  {
  async create(clientData) {
    return await Client.create(clientData);
  }
  async countAll() {
    return await Client.count();
  }
  async findById(id) {
    return await Client.findByPk(id);
  }
  async findByEmail(email) {
    return await Client.findOne({ where: { emailClient: email } });
  }
  async findAll() {
    return await Client.findAll();
  }
  async findByCIN(CIN) {
    return await Client.findOne({ where: { CINClient: CIN } });
  }
  async searchAll(word) {
    return await Client.findAll({
      where: {
        [Op.or]: [
          { nomClient: { [Op.like]: `%${word}%` } },
          { emailClient: { [Op.like]: `%${word}%` } },
          { CINClient: { [Op.like]: `%${word}%` } },
        ],
      },
    });
  }

  async update(id, clientData) {
    const client = await this.findById(id);
    if (client) {
      return await Client.update(clientData,{ where: { idClient: id } });
    }
    return null;
  }

  async delete(id) {
    const client = await this.findById(id);
    if (client) {
      return await Client.destroy({ where: { idClient: id } });
    }
    return null;
  }
}

module.exports = ClientRepository;
