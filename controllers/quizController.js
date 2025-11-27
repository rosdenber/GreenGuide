// Quiz Controller
const Quiz = require('../models/Quiz');
const Leaderboard = require('../models/Leaderboard');

// Get all quizzes
exports.getAllQuizzes = (req, res) => {
  Quiz.findAll()
    .then(quizzes => {
      res.json(quizzes);
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
};

// Get quiz by ID
exports.getQuizById = (req, res) => {
  const { id } = req.params;
  Quiz.findById(id)
    .then(quiz => {
      if (!quiz) {
        return res.status(404).json({ message: 'Quiz not found' });
      }
      res.json(quiz);
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
};

// Create new quiz
exports.createQuiz = (req, res) => {
  const { title, questions } = req.body;
  Quiz.create({ title, questions })
    .then(quiz => {
      res.status(201).json(quiz);
    })
    .catch(error => {
      res.status(400).json({ message: error.message });
    });
};

// Submit quiz answers
exports.submitQuiz = (req, res) => {
  const { quizId, answers, nickname } = req.body;
  
  // Calculate score
  Quiz.findById(quizId)
    .then(quiz => {
      if (!quiz) {
        return res.status(404).json({ message: 'Quiz not found' });
      }
      
      let score = 0;
      quiz.questions.forEach((question, index) => {
        if (question.correctAnswer === answers[index]) {
          score += 1;
        }
      });
      
      // Save to leaderboard
      return Leaderboard.create({ nickname, score, quizId: quiz.id })
        .then(() => {
          res.json({ score, total: quiz.questions.length });
        });
    })
    .catch(error => {
      res.status(400).json({ message: error.message });
    });
};

// Get leaderboard
exports.getLeaderboard = (req, res) => {
  Leaderboard.getWeeklyLeaderboard()
    .then(leaderboard => {
      res.json(leaderboard);
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
};