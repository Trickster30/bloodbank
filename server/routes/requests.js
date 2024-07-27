const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');

router.get('/', requestController.getAllRequests);
router.post('/', requestController.createRequest);
router.post('/:id', requestController.updateRequestStatus);
router.get('/user/:userId', requestController.getUserRequests);

module.exports = router;