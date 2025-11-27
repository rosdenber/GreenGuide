const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

// Get all quizzes
router.get('/', quizController.getAllQuizzes);

// Get leaderboard
router.get('/leaderboard', quizController.getLeaderboard);

// Get quiz by ID (must be after leaderboard route)
router.get('/:id', quizController.getQuizById);

// Create new quiz
router.post('/', quizController.createQuiz);

// Submit quiz answers
router.post('/submit', quizController.submitQuiz);

module.exports = router;