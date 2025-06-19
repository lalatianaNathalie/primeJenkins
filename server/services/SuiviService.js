class SuiviService {
    constructor(SuiviRepository) {
      this.SuiviRepository = SuiviRepository;
    }
    async createSuivi(Data) {
      return await this.SuiviRepository.create(Data);
    }
    async getSuiviById(id) {
      return await this.SuiviRepository.findById(id);
    }
    async getAllSuivis() {
      return await this.SuiviRepository.findAll();
    }
    async updateSuivi(id, Data) {
      return await this.SuiviRepository.update(id, Data);
    }
    async deleteSuivi(id) {
      return await this.SuiviRepository.delete(id);
    }
    async suivi(num) {
      return await this.SuiviRepository.suivi(num);
    }
  } 
  
  module.exports = SuiviService;
  