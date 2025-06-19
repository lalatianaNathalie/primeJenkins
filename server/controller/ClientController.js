class ClientController {
  constructor(clientService) {
    this.clientService = clientService;
  }

  async createClient(req, res) {
    try {
      const client = await this.clientService.createClient(req.body);
      res.status(201).json(client);
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
        res.status(500).json({ error: "Erreur lors de la creation du client" });
      }
    }
  }

  async getClientById(req, res) {
    try {
      const client = await this.clientService.getClientById(req.params.id);
      if (client) {
        res.status(200).json(client);
      } else {
        res.status(404).send("User not found");
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  async getResultSeach(req, res) {
    try {
      const clients = await this.clientService.searchAll(req.query.search);
      res.status(200).json(clients);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async getAllClients(req, res) {
    try {
      const clients = await this.clientService.getAllClients();
      res.status(200).json(clients);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  async getCountAllClients(req, res) {
    try {
      const clients = await this.clientService.getCountAllClient();
      res.status(200).json(clients);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async updateClient(req, res) {
    try {
      const client = await this.clientService.updateClient(
        req.params.id,
        req.body
      );
      res.status(200).json(client);
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
        res.status(500).json({ error: "Erreur lors de la creation du client" });
      }
    }
  }

  async deleteClient(req, res) {
    try {
      await this.clientService.deleteClient(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

module.exports = ClientController;
