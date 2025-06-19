class MarchandiseService {
  constructor(MarchandiseRepository) {
    this.MarchandiseRepository = MarchandiseRepository;
  }
  async createMarchandise(Data) {
    // Validation des données
    if (
      !Data.numConteneur ||
      !Data.typeConteneur ||
      !Data.numPlomb ||
      !Data.nature ||
      !Data.nbColis ||
      !Data.poid ||
      !Data.volume ||
      !Data.creerPar
    ) {
      throw new Error("Tous les champs sont requis.");
    }
    return await this.MarchandiseRepository.create(Data);
  }
  async getMarchandiseById(id) {
    return await this.MarchandiseRepository.findById(id);
  }
  async getAllMarchandises() {
    return await this.MarchandiseRepository.findAll();
  }
  async getPlusExpedier() {
    return await this.MarchandiseRepository.plusExpedier();
  }
  async updateMarchandise(id, Data) {
    return await this.MarchandiseRepository.update(id, Data);
  }
  async deleteMarchandise(id) {
    return await this.MarchandiseRepository.delete(id);
  }
  async findAll_suivi(num) {
    return await this.MarchandiseRepository.findAll_suivi(num);
  }
}

module.exports = MarchandiseService;
