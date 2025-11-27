const express = require('express');
const path = require('path');
const multer = require('multer');
const { classifyWaste } = require('./utils/mlService');

// Load environment variables
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Create uploads directory if it doesn't exist
const fs = require('fs');
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Route for waste segregation guide
app.get('/guide', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'guide.html'));
});

// Route for disposal instructions
app.get('/disposal', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'disposal.html'));
});

// Route for waste reduction tips
app.get('/tips', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'tips.html'));
});

// Route for quizzes
app.get('/quiz', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'quiz.html'));
});

// Route for trash classification page
app.get('/classify', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'classify.html'));
});

// Route for trash classification
app.post('/classify', upload.single('trashImage'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image uploaded' });
    }

    // Classify the image using the ML service
    const result = await classifyWaste(req.file.path);
    
    // Check if result is valid
    if (!result) {
      return res.status(500).json({ 
        success: false, 
        message: 'No response from ML service' 
      });
    }
    
    // If ML service returned an error, pass it through
    if (!result.success) {
      return res.status(500).json({ 
        success: false, 
        message: result.error || 'Classification failed' 
      });
    }
    
    // Check if we have the required result data
    if (!result.result || !result.result.category) {
      return res.status(500).json({ 
        success: false, 
        message: 'Invalid classification result received from ML service' 
      });
    }
    
    res.json({
      success: true,
      message: 'Image classified successfully',
      category: result.result.category,
      confidence: result.result.confidence,
      fileName: req.file.filename
    });
  } catch (error) {
    console.error('Classification error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// API routes
app.use('/api/guides', require('./routes/guides'));
app.use('/api/tips', require('./routes/tips'));
app.use('/api/quizzes', require('./routes/quizzes'));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});