class MasterService {
    constructor(MasterRepository) {
      this.MasterRepository = MasterRepository;
    }
    async create(Data) {
      // Validation des données 
      if ( !Data.idTransport || !Data.dateEmission || !Data.creerPar ) {
        throw new Error("Tous les champs sont requis.");
      }
      return await this.MasterRepository.create(Data);
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
  
      let transport = await this.MasterRepository.findByNumIMO(transportData.numIMO);
      if (!transport) {
        transport = await this.MasterRepository.create(transportData);
      }
      // Retourner l'ID du transport
      return transport.idMAWB;
    };
    async getById(id) {
      return await this.MasterRepository.findById(id);
    }
    async getWithId(id) {
      return await this.MasterRepository.getById(id);
    }
    async getAll() {
      return await this.MasterRepository.findAll(); 
    }
    async update(id, transactionData) {
      return await this.MasterRepository.update(id, transactionData);
    }
    async delete(id) {
      return await this.MasterRepository.delete(id);
    }
  }
  
  module.exports = MasterService;
  