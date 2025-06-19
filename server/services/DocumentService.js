class DocumentSerice {
    constructor(documentRepository) {
      this.documentRepository = documentRepository;
    }
    
    async docMBL(id) {      
      return await this.documentRepository.docMBL(id);
  }
    async docMWB() {      
      return await this.documentRepository.docMWB();
  }
}
  module.exports = DocumentSerice ;