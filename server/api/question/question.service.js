const pool = require("../../config/database");

module.exports = {
  createQuestion: (question, description, codeBlock, tags, userId) => {
    return new Promise((resolve, reject) => {
      pool.query(
        'INSERT INTO question (question, question_description, question_code_block, tags, user_id) VALUES (?, ?, ?, ?, ?)',
        [question, description, codeBlock, tags, userId],
        (error, result) => {
          if (error) {
            return reject(error);
          }
          const questionId = result.insertId;
          resolve({ questionId, question, description, codeBlock, tags, userId });
        }
      );
    });
  },
  // askQuestions: (callback) => {

  //   pool.query(
  //     // `SELECT  question_id, question, question_description, user_name FROM question JOIN registration ON question.user_id = registration.user_id ORDER BY question_id DESC`
  //     `SELECT question.*, registration.username, registration.user_id FROM question INNER JOIN registration ON question.user_id = registration.user_id ORDER BY question.question DESC`,
  //     [],
  //     (err, results) => {
  //       if (err) {
  //         return callback(err);
  //       }
  //       return callback(null, results);
  //     }
  //   );
  // },

  getAllQuestions: () => {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM question', (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      });
    });
  },
  // questionDetail: (data, callback) => {
  //   pool.query(
  //     // `SELECT * FROM question WHERE user_id = ?`
  //     `SELECT question_id,question, question_description FROM question WHERE question_id = ?`,
  //     [data.user_id],
  //     (err, result) => {
  //       if (err) return callback(err);
  //       return callback(null, result[0]);
  //     }
  //   );
  // },
};
