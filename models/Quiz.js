const db = require('../config/db');

// Quiz Model
class Quiz {
  constructor(id, title, questions, createdAt) {
    this.id = id;
    this.title = title;
    this.questions = questions; // Array of question objects
    this.createdAt = createdAt;
  }

  // Database operations
  static findAll() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM quizzes ORDER BY created_at DESC';
      db.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          const quizzes = results.map(row => 
            new Quiz(row.id, row.title, JSON.parse(row.questions), row.created_at)
          );
          resolve(quizzes);
        }
      });
    });
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM quizzes WHERE id = ?';
      db.query(query, [id], (err, results) => {
        if (err) {
          reject(err);
        } else if (results.length === 0) {
          resolve(null);
        } else {
          const row = results[0];
          resolve(new Quiz(row.id, row.title, JSON.parse(row.questions), row.created_at));
        }
      });
    });
  }

  static create(data) {
    return new Promise((resolve, reject) => {
      const { title, questions } = data;
      const query = 'INSERT INTO quizzes (title, questions) VALUES (?, ?)';
      db.query(query, [title, JSON.stringify(questions)], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(new Quiz(result.insertId, title, questions, new Date()));
        }
      });
    });
  }

  static update(id, data) {
    return new Promise((resolve, reject) => {
      const { title, questions } = data;
      const query = 'UPDATE quizzes SET title = ?, questions = ? WHERE id = ?';
      db.query(query, [title, JSON.stringify(questions), id], (err, result) => {
        if (err) {
          reject(err);
        } else if (result.affectedRows === 0) {
          resolve(null);
        } else {
          resolve(new Quiz(id, title, questions, new Date()));
        }
      });
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM quizzes WHERE id = ?';
      db.query(query, [id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  }
}

module.exports = Quiz;