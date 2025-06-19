class SuiviController {
    constructor(SuiviService) {
      this.SuiviService = SuiviService;
    }
    async createSuivi(req, res) {
      try {
        const Suivi = await this.SuiviService.createSuivi(
          req.body
        );
        res.status(201).json(Suivi);
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
    async getOneSuivi(req, res) {
      try {
        const Suivi = await this.SuiviService.getSuiviById(
          req.params.id
        );
        if (Suivi) {
          res.status(200).json(Suivi);
        } else {
          res.status(404).send("Suivi not found");
        }
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
    async getAllSuivis(req, res) {
      try {
        const Suivis = await this.SuiviService.getAllSuivis();
         res.status(200).json(Suivis);
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
    async updateSuivi(req, res) {
      try {
        const Suivi = await this.SuiviService.updateSuivi(
          req.params.id,
          req.body
        );
        res.status(200).json(Suivi);
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
    async deleteSuivi(req, res) {
      try {
        await this.SuiviService.deleteSuivi(req.params.id);
        res.status(204).send();
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
    async getSuivi(req,res){
      try { 
        const Suivis = await this.SuiviService.suivi(req.params.num);
        res.status(200).json(Suivis);
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
  }
  
  module.exports = SuiviController;
  