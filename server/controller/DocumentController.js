class documentController {
    constructor(documentService) {
      this.documentService = documentService;
    }
   async docMWB(req,res){
    try {
        const doc = await this.documentService.docMWB();
        res.status(200).json(doc);        
    } catch (error) {
        if (error.message) {
            res.status(401).json({ error: error.message });
          } else {
            // Erreur interne serveur
            res.status(500).json({ error: "Erreur lors de la generation du document" });
          }
    }
   }
   async docMBL(req,res){
    try {

        const doc = await this.documentService.docMBL(req.params.id);
        res.status(200).json(doc);        
    } catch (error) {
        if (error.message) {
            res.status(401).json({ error: error.message });
          } else {
            // Erreur interne serveur
            res.status(500).json({ error: "Erreur lors de la generation du document" });
          }
    }
   }
  }
  
  module.exports = documentController;
  