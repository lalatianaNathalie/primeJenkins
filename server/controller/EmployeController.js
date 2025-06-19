class EmployeController {
  constructor(employeService) {
    this.employeService = employeService;
  }
  async createEmploye(req, res) {
    try {
      const employe = await this.employeService.createEmploye(req.body);
      res.status(201).json(employe);
    } catch (error) {
      // res.status(500).send(error.message);
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
        res.status(500).json({ error: "Erreur lors de la creation d'employé" });
      }

    }
  }
  async authentification(req, res) {
    try {
      const { email, password } = req.body;
      const { token } = await this.employeService.authenticate(email, password);
      res.status(200).json({ token });
    } catch (error) {
      if (error.message) {
        res.status(401).json({ error: error.message });
      } else {
        // Erreur interne serveur
        res.status(500).json({ error: "Erreur lors de l'authentification" });
      }
    }
  }
  
  async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      const { token } = await this.employeService.forgotPwd(email);
      res.status(200).send({
        token,
        message: "Code d'accès temporaire envoyé avec succès.",
      });
    } catch (error) {
      if (error.message) {
        res.status(401).json({ error: error.message });
      } else {
        res
          .status(500)
          .json({ error: "Erreur lors de l'envoi du code temporaire." });
      }
    }
  }
  async resetPassword(req, res) {
    try {
      const { token, newPassword, email,codeTemp } = req.body;
      if (!token || !newPassword || !email || !codeTemp) {
        return res.status(400).json({ error: "Tous les infos sont requis." });
      }

      await this.employeService.resetNewPassword(email,newPassword);
      // const newToken = this.employeService.updateToken(token);

      res.status(200).send({token });
    } catch (error) {
      if (error.message) {
        res.status(401).json({ error: error.message });
      } else {
        res
          .status(500)
          .json({ error: "Erreur lors de l'envoi du code temporaire." });
      }
    }
  }
  async getEmploye(req, res) {
    try {
      const employe = await this.employeService.getEmployeById(req.params.id);
      if (employe) {
        res.status(200).json(employe);
      } else {
        res.status(404).send("User not found");
      }
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
        res.status(500).json({ error: "Erreur lors de la creation de l'employé" });
      }
    }
  }
  async getAllEmployes(req, res) {
    try {
      const employes = await this.employeService.getAllEmployes();
      res.status(200).json(employes);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  async updateEmploye(req, res) {
    try {
      const employe = await this.employeService.updateEmploye(
        req.params.id,
        req.body 
      );
      res.status(200).json(employe);
    } catch (error) {
      if (error.message) {
        res.status(401).json({ error: error.message });
      } else {
        res
          .status(500)
          .json({ error: "Erreur lors de l'envoi du code temporaire." });
      }
    }
  }
  async deleteEmploye(req, res) {
    try {
      await this.employeService.deleteEmploye(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}
module.exports = EmployeController;
