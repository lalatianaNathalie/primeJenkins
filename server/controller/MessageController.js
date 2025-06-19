class MessageController {
    constructor(MessageService) {
      this.MessageService = MessageService;
    }
 
    async envoyerEmail(req, res) {
      try {
        const { email,nom, message } = req.body;
        const verification = await this.MessageService.envoyerEmail(nom,email,message);
        res.status(200).json(verification);
      } catch (error) {
        if (error.message) {
          res.status(401).json({ error: error.message });
        } else {
          // Erreur interne serveur
          res.status(500).json({ error: "Erreur lors de l'authentification" });
        }
      }
    }
    
   
 

  }
  module.exports = MessageController;