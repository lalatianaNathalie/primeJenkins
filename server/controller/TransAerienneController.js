class TransAerienneController {
  constructor(transAerienneService) {
    this.transAerienneService = transAerienneService;
  }
  async createTransAerienne(req, res) {
    try {
      const transAerienne = await this.transAerienneService.createTransAerienne(
        req.body
      );
      res.status(201).json(transAerienne);
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
          .json({ error: "Erreur lors de la creation du transport aerienne" });
      }
    }
  }
  async getResultSeach(req, res) {
    try {
      const transport = await this.transAerienneService.searchAll(
        req.query.search
      );
      res.status(200).json(transport);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  async getOneTransAerienne(req, res) {
    try {
      const transAerienne =
        await this.transAerienneService.getTransAerienneById(req.params.id);
      if (transAerienne) {
        res.status(200).json(transAerienne);
      } else {
        res.status(404).send("transport aerienne not found");
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  async getAllTransAeriennes(req, res) {
    try {
      const transAeriennes =
        await this.transAerienneService.getAllTransAeriennes();
      res.status(200).json(transAeriennes);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  async updateTransAerienne(req, res) {
    try {
      const transAerienne = await this.transAerienneService.updateTransAerienne(
        req.params.id,
        req.body
      );
      res.status(200).json(transAerienne);
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
  async deleteTransAerienne(req, res) {
    try {
      await this.transAerienneService.deleteTransAerienne(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

module.exports = TransAerienneController;
