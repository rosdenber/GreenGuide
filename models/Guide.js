const db = require('../config/db');

// Guide Model
class Guide {
  constructor(id, title, content, category, createdAt) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.category = category; // recyclable, biodegradable, non-biodegradable, green-waste, hazardous
    this.createdAt = createdAt;
  }

  // Database operations
  static findAll() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM guides ORDER BY created_at DESC';
      db.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          const guides = results.map(row => 
            new Guide(row.id, row.title, row.content, row.category, row.created_at)
          );
          resolve(guides);
        }
      });
    });
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM guides WHERE id = ?';
      db.query(query, [id], (err, results) => {
        if (err) {
          reject(err);
        } else if (results.length === 0) {
          resolve(null);
        } else {
          const row = results[0];
          resolve(new Guide(row.id, row.title, row.content, row.category, row.created_at));
        }
      });
    });
  }

  static create(data) {
    return new Promise((resolve, reject) => {
      const { title, content, category } = data;
      const query = 'INSERT INTO guides (title, content, category) VALUES (?, ?, ?)';
      db.query(query, [title, content, category], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(new Guide(result.insertId, title, content, category, new Date()));
        }
      });
    });
  }

  static update(id, data) {
    return new Promise((resolve, reject) => {
      const { title, content, category } = data;
      const query = 'UPDATE guides SET title = ?, content = ?, category = ? WHERE id = ?';
      db.query(query, [title, content, category, id], (err, result) => {
        if (err) {
          reject(err);
        } else if (result.affectedRows === 0) {
          resolve(null);
        } else {
          resolve(new Guide(id, title, content, category, new Date()));
        }
      });
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM guides WHERE id = ?';
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

module.exports = Guide;