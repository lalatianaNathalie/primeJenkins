class TransMaritimeController {
    constructor(transMaritimeService) {
      this.transMaritimeService = transMaritimeService;
    }
    async createTransMaritime(req, res) {
      try {
        const transMaritime = await this.transMaritimeService.createTransMaritime(req.body);
        res.status(201).json(transMaritime);
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
          res.status(500).json({ error: "Erreur lors de la creation du transport maritime" });
        }
      }
    }
    async getResultSeach(req, res) {
      try {
        const transports = await this.transMaritimeService.searchAll(req.query.search);
        res.status(200).json(transports);
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
    async getOneTransMaritime(req, res) {
      try {
        const transMaritime = await this.transMaritimeService.getTransMaritimeById(req.params.id);
        if (transMaritime) {
          res.status(200).json(transMaritime);
        } else {
          res.status(404).send("Transport maritime not found");
        }
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
    async getAllTransMaritimes(req, res) {
      try {
        const transMaritimes = await this.transMaritimeService.getAllTransMaritimes();
        res.status(200).json(transMaritimes); 
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
    async updateTransMaritime(req, res) {
      try {
        const transMaritime = await this.transMaritimeService.updateTransMaritime(
          req.params.id,
          req.body
        );
        res.status(200).json(transMaritime);
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
          res.status(500).json({ error: "Erreur lors de la creation du Transport maritime" });
        }
      }
    }
    async deleteTransMaritime(req, res) {
      try {
        await this.transMaritimeService.deleteTransMaritime(req.params.id);
        res.status(204).send();
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
  }
  
  module.exports = TransMaritimeController;
  