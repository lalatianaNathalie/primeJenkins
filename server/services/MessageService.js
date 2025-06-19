const emailAdmin = "mandrindraesperant@gmail.com";
const nodemailer = require("nodemailer");


class MessageService {
  constructor(MessageRepository) {
    this.MessageRepository = MessageRepository;
  }
  async envoyerEmail(nom, email, message) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: emailAdmin,
      subject: "Message de visiteur",
      html: `
        <p>Bonjour,</p>
        <p>Cette message est envoyer par le visiteur de site de PRIMEX logistique</p>
        <p><strong>Nom :</strong> <br/>${nom}</p>
        <p><strong>Email :</strong> <br/>${email}</p>
        <p><strong>Message :</strong> <br/>${message}</p>
      
        
        
        <br />
        <p>Merci,<br/>L'équipe de PRIMEX LOGISTICS</p>
      `,
      headers: {
        "Content-Type": "text/html; charset=UTF-8", // Spécifie que l'email est en HTML
      },
    };

    return await transporter.sendMail(mailOptions);
  }
  async createMessage(MessageData) {
    // Validation des données
    //   if (
    //     !MessageData.nomMessage || !MessageData.eMessage || !MessageData.CINMessage || !MessageData.creerPar
    //   ) {
    //     throw new Error("Tous les champs sont requis.");
    //   }
    return await this.MessageRepository.create(MessageData);
  }
  async getMessageById(id) {
    return await this.MessageRepository.findById(id);
  }
  async getCountAllMessage() {
    return await this.MessageRepository.countAll();
  }
  async searchAll(word) {
    return await this.MessageRepository.searchAll(word);
  }
  async getAllMessages() {
    return await this.MessageRepository.findAll();
  }
  async updateMessage(id, MessageData) {
    return await this.MessageRepository.update(id, MessageData);
  }
  async deleteMessage(id) {
    return await this.MessageRepository.delete(id);
  }
}

module.exports = MessageService;
