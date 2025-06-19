class HouseController {
    constructor(HouseService) {
      this.HouseService = HouseService;
    }
    async createHouseTransaction(req, res) {
      try {
        const HouseTransaction = await this.HouseService.createHouseTransaction(
          req.body
        );
        res.status(201).json(HouseTransaction);
      } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            // Gérer l'erreur d'unicité
            res.status(400).json({
              error:
                error.errors[0].message || "Une valeur unique est déjà présente.",
            });
          } else if (error.message) {
            res.status(401).json({ error: error.message });
          } else {
            // Erreur interne serveur
            res.status(500).json({ error: "Erreur lors de la creation du House" });
          }
      }
    }
    async getOneHouseTransaction(req, res) {
      try {
        const HouseTransaction = await this.HouseService.getHouseTransactionById(
          req.params.id
        );
        if (HouseTransaction) {
          res.status(200).json(HouseTransaction);
        } else {
          res.status(404).send("HouseTransaction not found");
        }
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
    async getOneHouseTransactionByNum(req, res) {
      try {
        
        const HouseTransaction = await this.HouseService.getHouseTransactionByNum(
          req.params.num
        );
        if (HouseTransaction) {
          res.status(200).json(HouseTransaction);
        } else {
          res.status(404).send("HouseTransaction not found");
        }
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
    async getAllHouseTransactions(req, res) {
      try {
        const HouseTransactions = await this.HouseService.getAllHouseTransactions();
        res.status(200).json(HouseTransactions);
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
    async getAllByMonthHouseTransactions(req, res) {
      try {
        const HouseTransactions = await this.HouseService.getAllByMonthHouseTransactions();
        res.status(200).json(HouseTransactions);
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
    async getCountAllOnYearHouseTransactions(req, res) {
      try {
        const HouseTransactions = await this.HouseService.getCountAllOnYearHouseTransactions();
        res.status(200).json(HouseTransactions);
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
    async getCountAllHouseTransactions(req, res) {
      try {
        const HouseTransactions = await this.HouseService.getCountAllHouseTransactions();
        res.status(200).json(HouseTransactions);
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
    async getAllHouseTransactionsMere(req, res) {      
      try {
        const HouseTransactions = await this.HouseService.getAllHouseTransactionsMere(req.params.id);
        res.status(200).json(HouseTransactions);
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
    async getTotalColisMere(req, res) {            
      try {
        const HouseTransactions = await this.HouseService.getTotalColis(req.params.id);
        res.status(200).json(HouseTransactions);
      } catch (error) { 
        res.status(500).send(error.message);
      }
    }
    async updateHouseTransaction(req, res) {
      try {
        const HouseTransaction = await this.HouseService.updateHouseTransaction(
          req.params.id,
          req.body
        );
        res.status(200).json(HouseTransaction);
      } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            // Gérer l'erreur d'unicité
            res.status(400).json({
              error:
                error.errors[0].message || "Une valeur unique est déjà présente.",
            });
          } else if (error.message) {
            res.status(401).json({ error: error.message });
          } else {
            // Erreur interne serveur
            res.status(500).json({ error: "Erreur lors de la creation du House" });
          }
      }
    }
    async deleteHouseTransaction(req, res) {
      try {
        await this.HouseService.deleteHouseTransaction(req.params.id);
        res.status(204).send();
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
  } 
  
  module.exports = HouseController;
  