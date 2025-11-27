const express = require('express');
const router = express.Router();
const guideController = require('../controllers/guideController');

// Get all guides
router.get('/', guideController.getAllGuides);

// Get guide by ID
router.get('/:id', guideController.getGuideById);

// Create new guide
router.post('/', guideController.createGuide);

// Update guide
router.put('/:id', guideController.updateGuide);

// Delete guide
router.delete('/:id', guideController.deleteGuide);

module.exports = router;