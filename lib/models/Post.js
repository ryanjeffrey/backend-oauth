const pool = require('../utils/pool');

module.exports = class Post {
  id;
  title;
  content;
  user_id;

  constructor({ id, title, content, user_id }) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.userId = user_id;
  }

  static async getAll() {
    const { rows } = await pool.query(`
    SELECT * FROM posts`);
    return rows.map((row) => new Post(row));
  }
};
