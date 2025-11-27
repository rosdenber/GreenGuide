const db = require('../config/db');

// Leaderboard Model
class Leaderboard {
  constructor(id, nickname, score, quizId, createdAt) {
    this.id = id;
    this.nickname = nickname;
    this.score = score;
    this.quizId = quizId;
    this.createdAt = createdAt;
  }

  // Database operations
  static getWeeklyLeaderboard() {
    return new Promise((resolve, reject) => {
      // Get entries from the last 7 days
      const query = `
        SELECT * FROM leaderboard 
        WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
        ORDER BY score DESC, created_at ASC
        LIMIT 10
      `;
      db.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          const leaderboard = results.map(row => 
            new Leaderboard(row.id, row.nickname, row.score, row.quiz_id, row.created_at)
          );
          resolve(leaderboard);
        }
      });
    });
  }

  static create(data) {
    return new Promise((resolve, reject) => {
      const { nickname, score, quizId } = data;
      const query = 'INSERT INTO leaderboard (nickname, score, quiz_id) VALUES (?, ?, ?)';
      db.query(query, [nickname, score, quizId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(new Leaderboard(result.insertId, nickname, score, quizId, new Date()));
        }
      });
    });
  }
}

module.exports = Leaderboard;