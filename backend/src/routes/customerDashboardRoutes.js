const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/customerDashboardController');

router.get('/:customer_id', dashboardController.getCustomerDashboard);

module.exports = router;
