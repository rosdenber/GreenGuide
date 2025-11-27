const express = require('express');
const router = express.Router();
const tipController = require('../controllers/tipController');

// Get all tips
router.get('/', tipController.getAllTips);

// Get tip by ID
router.get('/:id', tipController.getTipById);

// Create new tip
router.post('/', tipController.createTip);

// Update tip
router.put('/:id', tipController.updateTip);

// Delete tip
router.delete('/:id', tipController.deleteTip);

module.exports = router;