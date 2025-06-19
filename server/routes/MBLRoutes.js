const express = require('express');
const MasterRepository = require('../repository/MBLRepository');
const MasterService = require('../services/MasterService');
const MasterController = require('../controller/MasterController');

const router = express.Router(); 

const masterRepository = new MasterRepository();
const masterService = new MasterService(masterRepository);
const masterController = new MasterController(masterService);

router.post('/', (req, res) => masterController.createMaster(req, res));
router.get('/', (req, res) => masterController.getAllMasters(req, res));
router.get('/:id', (req, res) =>masterController.getOneMaster(req, res));
router.put('/:id', (req, res) => masterController.updateMaster(req, res));
router.delete('/:id', (req, res) => masterController.deleteMaster(req, res));
router.get('/get/:id', (req, res) =>masterController.getOneMasterId(req, res));

module.exports = router;
