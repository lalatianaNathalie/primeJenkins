const express = require('express');
const HouseTransactionRepository = require('../repository/HAWBRepository');
const HouseTransactionService = require('../services/HouseService');
const HouseTransactionController = require('../controller/HouseController');

const router = express.Router(); 

const houseTransactionRepository = new HouseTransactionRepository();
const houseTransactionService = new HouseTransactionService(houseTransactionRepository);
const houseTransactionController = new HouseTransactionController(houseTransactionService);
 
router.post('/', (req, res) => houseTransactionController.createHouseTransaction(req, res));
router.get('/', (req, res) => houseTransactionController.getAllHouseTransactions(req, res));
router.get('/:id', (req, res) =>houseTransactionController.getOneHouseTransaction(req, res));
router.put('/:id', (req, res) => houseTransactionController.updateHouseTransaction(req, res));
router.delete('/:id', (req, res) => houseTransactionController.deleteHouseTransaction(req, res));
router.get('/get/:num', (req, res) => houseTransactionController.getOneHouseTransactionByNum(req, res));
router.get('/doc/:id', (req, res) => houseTransactionController.getAllHouseTransactionsMere(req, res));
router.get('/tot/:id', (req, res) => houseTransactionController.getTotalColisMere(req, res));
router.get('/count/all/', (req, res) => houseTransactionController.getCountAllHouseTransactions(req, res));
router.get('/count/onYear/', (req, res) => houseTransactionController.getCountAllOnYearHouseTransactions(req, res));
router.get('/count/byMonth/', (req, res) => houseTransactionController.getAllByMonthHouseTransactions(req, res));


module.exports = router;
