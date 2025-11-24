const express = require('express');
const router = express.Router();
const installmentController = require('../controllers/installmentController');

router.post('/add', installmentController.addInstallment);
router.get('/customer/:customer_id', installmentController.getInstallmentsByCustomer);
router.put('/pay/:id', installmentController.markInstallmentPaid);
router.put('/update/:id', installmentController.updateInstallment);
router.delete('/delete/:id', installmentController.deleteInstallment);

module.exports = router;
