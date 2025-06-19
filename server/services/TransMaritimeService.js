
class TransMaritimeService {
  constructor(transMaritimeRepository) {
    this.transMaritimeRepository = transMaritimeRepository;
  }
  async createTransMaritime(Data) {
    // Validation des données 
    if (!Data.numIMO
      || !Data.nomNavire 
      || !Data.armateur
      || !Data.dateChargement 
      || !Data.paysChargement 
      || !Data.villeChargement 
      || !Data.paysDechargement
      || !Data.creerPar ) {
      throw new Error("Tous les champs sont requis.");
    }
    return await this.transMaritimeRepository.create(Data);
  }
  async searchAll(word) {
    return await this.transMaritimeRepository.searchAll(word);
  }
  async getOrCreateTransport(transportData){
    if (!Data.numIMO
      || !Data.nomNavire 
      || !Data.dateChargement 
      || !Data.paysChargement 
      || !Data.villeChargement 
      || !Data.paysDechargement
      || !Data.creerPar ) {
      throw new Error("Tous les champs sont requis.");
    }

    let transport = await this.transMaritimeRepository.findByNumIMO(transportData.numIMO);
    if (!transport) {
      transport = await this.transMaritimeRepository.create(transportData);
    }
    // Retourner l'ID du transport
    return transport.idTransMaritime;
  };
  async getTransMaritimeById(id) {
    return await this.transMaritimeRepository.findById(id);
  }
  async getAllTransMaritimes() {
    return await this.transMaritimeRepository.findAll(); 
  }
  async updateTransMaritime(id, employeData) {
    return await this.transMaritimeRepository.update(id, employeData);
  }
  async deleteTransMaritime(id) {
    return await this.transMaritimeRepository.delete(id);
  }
}


module.exports = TransMaritimeService;
