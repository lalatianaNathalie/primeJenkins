const { where } = require('sequelize');
const Employe = require('../models/Employe');
class EmployeRepository  {

  async create(employeData) {
    return await Employe.create(employeData);
  }
  async findById(id) {
    return await Employe.findByPk(id);
  }
  async findByEmail(email) {
    return await Employe.findOne({ where: { emailEmploye: email } });
  }
  async findByEmailAndId(email, id) {
    return await Employe.findOne({ where: { emailEmploye: email ,idEmployer:id} });
  }
  async findAll() {
    return await Employe.findAll();
  }
  async update(id, employeData) {
    const employe = await this.findById(id);
    if (employe) {
      return await employe.update(employeData);
    }
    return null;
  } 
  async resetpwd(email, employeData) {
    const employe = await Employe.findOne({ where: { emailEmploye: email } });
    if (employe) {
      return await employe.update(employeData);
    }
    return null;
  }
async resetNewPassword(email, pwd){
  const employe = await this.findByEmail(email)
  if(!employe){
    throw new Error("Employé non trouvé")
  }
  return await Employe.update(
    {motDePasse:pwd},
    {where:{emailEmploye: email}}
  )
}
  async delete(id) {
    const employe = await this.findById(id);
    if (employe) {
      return await employe.destroy({where: { idEmployer: id }});
    }
    return null;
  }
}

module.exports = EmployeRepository;
