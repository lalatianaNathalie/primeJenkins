class MarchandiseController {
    constructor(MarchandiseService) {
      this.MarchandiseService = MarchandiseService;
    }
    async createMarchandise(req, res) {
      try {
        const Marchandise = await this.MarchandiseService.createMarchandise(req.body);
        res.status(201).json(Marchandise);
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
          res.status(500).json({ error: "Erreur lors de la creation du Marchandise" });
        }
      }
    }
    async getOneMarchandise(req, res) {
      try {
        const Marchandise = await this.MarchandiseService.getMarchandiseById(req.params.id);
        if (Marchandise) {
          res.status(200).json(Marchandise);
        } else {
          res.status(404).send("Marchandise not found");
        }
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
    async getAllMarchandises(req, res) {
      try {
        const Marchandises = await this.MarchandiseService.getAllMarchandises();        
        res.status(200).json(Marchandises); 
      } catch (error) {
        res.status(500).send(error.message);
      }
    } 
    async getPlusExpedier(req, res) {
      try {
        const Marchandises = await this.MarchandiseService.getPlusExpedier();        
        res.status(200).json(Marchandises); 
      } catch (error) {
        res.status(500).send(error.message);
      }
    } 
    async updateMarchandise(req, res) {
      try {
        const Marchandise = await this.MarchandiseService.updateMarchandise(
          req.params.id,
          req.body
        );
        res.status(200).json(Marchandise);
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
          res.status(500).json({ error: "Erreur lors de la creation du Marchandise" });
        }
      }
    }
    async deleteMarchandise(req, res) {
      try {
        await this.MarchandiseService.deleteMarchandise(req.params.num);
        res.status(204).send();
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
    async findAll_suivi(req,res) {
      try {
        const Marchandises=  await this.MarchandiseService.findAll_suivi(req.params.num);
        res.status(200).json(Marchandises); 
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
  }
  
  module.exports = MarchandiseController;
  