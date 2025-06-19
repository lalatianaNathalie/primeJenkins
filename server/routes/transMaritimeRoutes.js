const express = require('express');
const TransMaritimeRepository = require('../repository/TransMaritimeRepository');
const TransMaritimeService = require('../services/TransMaritimeService');
const TransMaritimeController = require('../controller/TransMaritimeController');

const router = express.Router(); 

const transMaritimeRepository = new TransMaritimeRepository();
const transMaritimeService = new TransMaritimeService(transMaritimeRepository);
const transMaritimeController = new TransMaritimeController(transMaritimeService);

router.post('/', (req, res) => transMaritimeController.createTransMaritime(req, res));
router.get('/search', (req, res) =>transMaritimeController.getResultSeach(req, res));
router.get('/', (req, res) => transMaritimeController.getAllTransMaritimes(req, res));
router.get('/:id', (req, res) =>transMaritimeController.getOneTransMaritime(req, res));
router.put('/:id', (req, res) => transMaritimeController.updateTransMaritime(req, res));
router.delete('/:id', (req, res) => transMaritimeController.deleteTransMaritime(req, res));

module.exports = router;
