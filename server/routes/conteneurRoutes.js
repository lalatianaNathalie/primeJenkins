const express = require('express');
const ConteneurRepository = require('../repository/ConteneurRepository');
const ConteneurService = require('../services/ConteneurService');
const ConteneurController = require('../controller/ConteneurController');

const router = express.Router(); 

const conteneurRepository = new ConteneurRepository();
const conteneurService = new ConteneurService(conteneurRepository); 
const conteneurController = new ConteneurController(conteneurService);

router.post('/', (req, res) => conteneurController.createConteneur(req, res));
router.get('/', (req, res) => conteneurController.getAllConteneurs(req, res));
router.get('/:id', (req, res) =>conteneurController.getConteneurById(req, res));
router.put('/:id', (req, res) => conteneurController.updateConteneur(req, res));
router.delete('/:id', (req, res) => conteneurController.deleteConteneur(req, res));
router.get('/mbl/:id', (req, res) =>conteneurController.findAllWithMBL(req, res));
 
module.exports = router;