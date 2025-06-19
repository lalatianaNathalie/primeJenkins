const express = require('express');
const router = express.Router(); 

const MessageService = require('../services/MessageService');
const MessageController = require('../controller/MessageController');
const messageService = new MessageService();
const messageController = new MessageController(messageService);

router.post('/', (req, res) => messageController.envoyerEmail(req, res));


module.exports = router;
