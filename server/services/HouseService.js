class HouseService {
  constructor(HouseRepository) {
    this.HouseRepository = HouseRepository;
  }
  async createHouseTransaction(Data) {
    return await this.HouseRepository.create(Data);
  }
  async getHouseTransactionById(id) {
    return await this.HouseRepository.findById(id);
  }
  async getHouseTransactionByNum(num) { 
    return await this.HouseRepository.findByNum(num);
  }
  async getAllHouseTransactions() {
    return await this.HouseRepository.findAll();
  }
  async getAllByMonthHouseTransactions() {
    return await this.HouseRepository.countByMonth();
  }
  async getCountAllHouseTransactions() {
    return await this.HouseRepository.countAll();
  }
  async getCountAllOnYearHouseTransactions() {
    return await this.HouseRepository.countAllOnYear();
  }
  async getAllHouseTransactionsMere(id) {
    return await this.HouseRepository.findAllByMaster(id);
  }

  async getTotalColis(id) {
    return await this.HouseRepository.totalColis(id);
  }
  async updateHouseTransaction(id, Data) {
    return await this.HouseRepository.update(id, Data);
  }
  async deleteHouseTransaction(id) {
    return await this.HouseRepository.delete(id);
  }
}

module.exports = HouseService;
