// Guide Controller
const Guide = require('../models/Guide');

// Get all guides
exports.getAllGuides = (req, res) => {
  Guide.findAll()
    .then(guides => {
      res.json(guides);
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
};

// Get guide by ID
exports.getGuideById = (req, res) => {
  const { id } = req.params;
  Guide.findById(id)
    .then(guide => {
      if (!guide) {
        return res.status(404).json({ message: 'Guide not found' });
      }
      res.json(guide);
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
};

// Create new guide
exports.createGuide = (req, res) => {
  const { title, content, category } = req.body;
  Guide.create({ title, content, category })
    .then(guide => {
      res.status(201).json(guide);
    })
    .catch(error => {
      res.status(400).json({ message: error.message });
    });
};

// Update guide
exports.updateGuide = (req, res) => {
  const { id } = req.params;
  const { title, content, category } = req.body;
  Guide.update(id, { title, content, category })
    .then(guide => {
      if (!guide) {
        return res.status(404).json({ message: 'Guide not found' });
      }
      res.json(guide);
    })
    .catch(error => {
      res.status(400).json({ message: error.message });
    });
};

// Delete guide
exports.deleteGuide = (req, res) => {
  const { id } = req.params;
  Guide.delete(id)
    .then(result => {
      if (!result) {
        return res.status(404).json({ message: 'Guide not found' });
      }
      res.json({ message: 'Guide deleted successfully' });
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
};