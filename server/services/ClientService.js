class ClientService {
    constructor(clientRepository) {
      this.clientRepository = clientRepository;
    }
    
    async createClient(clientData) {
      // Validation des données
      if (
        !clientData.nomClient || !clientData.emailClient || !clientData.CINClient || !clientData.creerPar
      ) {
        throw new Error("Tous les champs sont requis.");
      }
      return await this.clientRepository.create(clientData);
    }

    async getOrCreateClient(clientData){
      if(!clientData.CINClient ){
        throw new Error("Le CIN de client est requis");
      }
      let client = await this.clientRepository.findByCIN(clientData.CINClient);
      if (!client) {
        client = await this.createClient(clientData);
      }
      // Retourner l'ID
      return client.idClient;
    }

    async getClientById(id) {
      return await this.clientRepository.findById(id);
    }
    async getCountAllClient() {
      return await this.clientRepository.countAll();
    }
    async searchAll(word) {
      return await this.clientRepository.searchAll(word);
    }
    async getAllClients() { 
      return await this.clientRepository.findAll();
    }
  
    async updateClient(id, clientData) {
      return await this.clientRepository.update(id, clientData);
    }
  
    async deleteClient(id) {
      return await this.clientRepository.delete(id);
    }
  }
  module.exports = ClientService ;