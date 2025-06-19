const express = require('express');
const TransAerienneRepository = require('../repository/TransAerienneRepository');
const TransAerienneService = require('../services/TransAerienneService');
const TransAerienneController = require('../controller/TransAerienneController');

const router = express.Router(); 

const transAerienneRepository = new TransAerienneRepository();
const transAerienneService = new TransAerienneService(transAerienneRepository);
const transAerienneController = new TransAerienneController(transAerienneService);

router.post('/', (req, res) => transAerienneController.createTransAerienne(req, res));
// router.get('/search', (req, res) =>transAerienneController.getResultSeach(req, res));
router.get('/:id', (req, res) =>transAerienneController.getOneTransAerienne(req, res));
router.get('/', (req, res) => transAerienneController.getAllTransAeriennes(req, res));
router.put('/:id', (req, res) => transAerienneController.updateTransAerienne(req, res));
router.delete('/:id', (req, res) => transAerienneController.deleteTransAerienne(req, res));

module.exports = router;
