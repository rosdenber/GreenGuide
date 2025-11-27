// Tip Controller
const Tip = require('../models/Tip');

// Get all tips
exports.getAllTips = (req, res) => {
  Tip.findAll()
    .then(tips => {
      res.json(tips);
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
};

// Get tip by ID
exports.getTipById = (req, res) => {
  const { id } = req.params;
  Tip.findById(id)
    .then(tip => {
      if (!tip) {
        return res.status(404).json({ message: 'Tip not found' });
      }
      res.json(tip);
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
};

// Create new tip
exports.createTip = (req, res) => {
  const { title, content } = req.body;
  Tip.create({ title, content })
    .then(tip => {
      res.status(201).json(tip);
    })
    .catch(error => {
      res.status(400).json({ message: error.message });
    });
};

// Update tip
exports.updateTip = (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  Tip.update(id, { title, content })
    .then(tip => {
      if (!tip) {
        return res.status(404).json({ message: 'Tip not found' });
      }
      res.json(tip);
    })
    .catch(error => {
      res.status(400).json({ message: error.message });
    });
};

// Delete tip
exports.deleteTip = (req, res) => {
  const { id } = req.params;
  Tip.delete(id)
    .then(result => {
      if (!result) {
        return res.status(404).json({ message: 'Tip not found' });
      }
      res.json({ message: 'Tip deleted successfully' });
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
};