class ConteneurController {
    constructor(ConteneurService) {
      this.ConteneurService = ConteneurService;
    }
  
    async createConteneur(req, res) {
      try {
        const Conteneur = await this.ConteneurService.createConteneur(req.body);
        res.status(201).json(Conteneur);
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
          res.status(500).json({ error: "Erreur lors de la creation du Conteneur" });
        }
      }
    }
  
    async getConteneurById(req, res) {
      try {
        const Conteneur = await this.ConteneurService.getConteneurById(req.params.id);
        if (Conteneur) {
          res.status(200).json(Conteneur);
        } else {
          res.status(404).send("User not found");
        }
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
    async findAllWithMBL(req, res) {
      try {
        const Conteneur = await this.ConteneurService.findAllWithMBL(req.params.id);
        if (Conteneur) {
          res.status(200).json(Conteneur);
        } else {
          res.status(404).send("Conteneur not found");
        }
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
    async getAllConteneurs(req, res) {
      try {
        const Conteneurs = await this.ConteneurService.getAllConteneurs();
        res.status(200).json(Conteneurs);
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
  
    async updateConteneur(req, res) {
      try {
        const Conteneur = await this.ConteneurService.updateConteneur(
          req.params.id,
          req.body
        );
        res.status(200).json(Conteneur);
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
          res.status(500).json({ error: "Erreur lors de la creation du Conteneur" });
        }
      }
    }
  
    async deleteConteneur(req, res) {
      try {
        await this.ConteneurService.deleteConteneur(req.params.id);
        res.status(204).send();
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
  }
  
  module.exports = ConteneurController;
  