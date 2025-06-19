class ConteneurService {
    constructor(ConteneurRepository) {
      this.ConteneurRepository = ConteneurRepository;
    }
    
    async createConteneur(ConteneurData) {    
      return await this.ConteneurRepository.create(ConteneurData);
    }


    async getConteneurById(id) {
      return await this.ConteneurRepository.findById(id);
    }
     async findAllWithMBL(mbl){
      return await this.ConteneurRepository.findAllWithMBL(mbl);
     }
    async getAllConteneurs() { 
      return await this.ConteneurRepository.findAll();
    }
  
    async updateConteneur(id, ConteneurData) {
      return await this.ConteneurRepository.update(id, ConteneurData);
    }
  
    async deleteConteneur(id) {
      return await this.ConteneurRepository.delete(id);
    }
  }

  module.exports = ConteneurService ;