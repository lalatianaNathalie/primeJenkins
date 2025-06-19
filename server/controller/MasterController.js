const ConteneurReposotory = require("../repository/ConteneurRepository");
const repositoryConteneur = new ConteneurReposotory();
class MasterController {
  constructor(MasterService) {
    this.MasterService = MasterService;
  }
  async createMaster(req, res) {
    try {
      const Master = await this.MasterService.create(req.body);
      if (req.body.conteneur) {
        const conteneur = req.body.conteneur;
        for (const c of conteneur) {
          await repositoryConteneur.create(c);
        }
      }

      res.status(201).json(Master);
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
        res
          .status(500)
          .json({ error: "Erreur lors de la creation du transport maritime" });
      }
    }
  }
  async getOneMaster(req, res) {
    try {
      const Master = await this.MasterService.getById(req.params.id);
      if (Master) {
        res.status(200).json(Master);
      } else {
        res.status(404).send("Master  not found");
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  async getOneMasterId(req, res) {
    try {
      const Master = await this.MasterService.getWithId(req.params.id);
      if (Master) {
        res.status(200).json(Master);
      } else {
        res.status(404).send("Master  not found");
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  async getAllMasters(req, res) {
    try {
      const Masters = await this.MasterService.getAll();
      res.status(200).json(Masters);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  async updateMaster(req, res) {
    try {
      const Master = await this.MasterService.update(req.params.id, req.body);
      res.status(200).json(Master);
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
        res
          .status(500)
          .json({ error: "Erreur lors de la creation du Transport maritime" });
      }
    }
  }
  async deleteMaster(req, res) {
    try {
      await this.MasterService.delete(req.params.id);
      res.status(204).send("Master deleted");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

module.exports = MasterController;
