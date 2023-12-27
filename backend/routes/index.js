
const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');

router.post('/userInput', controller.addData);
router.post('/login', controller.loginUser);
router.get('/all-data', controller.getAllData); 


module.exports = router;
