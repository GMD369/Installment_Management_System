const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

router.get('/daily', reportController.dailyReport);
router.get('/weekly', reportController.weeklyReport);
router.get('/monthly', reportController.monthlyReport);
router.get('/custom', reportController.customReport);

module.exports = router;
