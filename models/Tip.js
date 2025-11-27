const db = require('../config/db');

// Tip Model
class Tip {
  constructor(id, title, content, createdAt) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.createdAt = createdAt;
  }

  // Database operations
  static findAll() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM tips ORDER BY created_at DESC';
      db.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          const tips = results.map(row => 
            new Tip(row.id, row.title, row.content, row.created_at)
          );
          resolve(tips);
        }
      });
    });
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM tips WHERE id = ?';
      db.query(query, [id], (err, results) => {
        if (err) {
          reject(err);
        } else if (results.length === 0) {
          resolve(null);
        } else {
          const row = results[0];
          resolve(new Tip(row.id, row.title, row.content, row.created_at));
        }
      });
    });
  }

  static create(data) {
    return new Promise((resolve, reject) => {
      const { title, content } = data;
      const query = 'INSERT INTO tips (title, content) VALUES (?, ?)';
      db.query(query, [title, content], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(new Tip(result.insertId, title, content, new Date()));
        }
      });
    });
  }

  static update(id, data) {
    return new Promise((resolve, reject) => {
      const { title, content } = data;
      const query = 'UPDATE tips SET title = ?, content = ? WHERE id = ?';
      db.query(query, [title, content, id], (err, result) => {
        if (err) {
          reject(err);
        } else if (result.affectedRows === 0) {
          resolve(null);
        } else {
          resolve(new Tip(id, title, content, new Date()));
        }
      });
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM tips WHERE id = ?';
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

module.exports = Tip;