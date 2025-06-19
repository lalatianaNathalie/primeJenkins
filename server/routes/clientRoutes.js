const express = require('express');
const ClientRepository = require('../repository/ClientRepository');
const ClientService = require('../services/ClientService');
const ClientController = require('../controller/ClientController');

const router = express.Router(); 

const clientRepository = new ClientRepository();
const clientService = new ClientService(clientRepository);
const clientController = new ClientController(clientService);

router.post('/', (req, res) => clientController.createClient(req, res));
router.get('/search', (req, res) =>clientController.getResultSeach(req, res)); 
router.get('/all/', (req, res) =>clientController.getCountAllClients(req, res)); 
router.get('/', (req, res) => clientController.getAllClients(req, res));
router.get('/:id', (req, res) =>clientController.getClientById(req, res));
router.put('/:id', (req, res) => clientController.updateClient(req, res));
router.delete('/:id', (req, res) => clientController.deleteClient(req, res));

module.exports = router;