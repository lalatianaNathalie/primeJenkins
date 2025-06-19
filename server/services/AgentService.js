class AgentService {
    constructor(AgentRepository) {
      this.AgentRepository = AgentRepository;
    }
    async createAgent(AgentData) {
      // Validation des données
    //   if (
    //     !AgentData.nomAgent || !AgentData.eAgent || !AgentData.CINAgent || !AgentData.creerPar
    //   ) {
    //     throw new Error("Tous les champs sont requis.");
    //   }
      return await this.AgentRepository.create(AgentData);
    }
    async getAgentById(id) {
      return await this.AgentRepository.findById(id);
    }
    async getCountAllAgent() {
      return await this.AgentRepository.countAll();
    }
    async searchAll(word) {
      return await this.AgentRepository.searchAll(word);
    }
    async getAllAgents() { 
      return await this.AgentRepository.findAll();
    }
    async updateAgent(id, AgentData) {
      return await this.AgentRepository.update(id, AgentData);
    }
    async deleteAgent(id) {
      return await this.AgentRepository.delete(id);
    }
  }

  module.exports = AgentService ;