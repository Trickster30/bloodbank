const express = require('express');
const router = express.Router();
const donorController = require('../controllers/donorController');

router.get('/', donorController.getAllDonors);
router.post('/', donorController.addDonor);
router.put('/:id', donorController.updateDonor);
router.delete('/:id', donorController.deleteDonor);

module.exports = router;