const express = require('express');
const SuiviRepository = require('../repository/SuiviHBLRepository');
const SuiviService = require('../services/SuiviService');
const SuiviController = require('../controller/SuiviController');

const router = express.Router(); 

const suiviRepository = new SuiviRepository();
const suiviService = new SuiviService(suiviRepository);
const suiviController = new SuiviController(suiviService);
 
router.post('/', (req, res) => suiviController.createSuivi(req, res));
router.get('/', (req, res) => suiviController.getAllSuivis(req, res));
router.get('/:id', (req, res) =>suiviController.getOneSuivi(req, res));
router.put('/:id', (req, res) => suiviController.updateSuivi(req, res));
router.delete('/:id', (req, res) => suiviController.deleteSuivi(req, res));
router.get('/suivre/:num', (req, res) => suiviController.getSuivi(req, res));
 
module.exports = router;
