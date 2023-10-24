const pool = require("../../config/database");
// const { QuestionService, questions, selectQuestion } = require("./question.service");
const QuestionService = require('./question.service')

module.exports = {
  
  createQuestion: async (req, res) => {
    try {
      const { question, question_description, question_code_block, tags, user_id } = req.body;
      const createdQuestion = await QuestionService.createQuestion(question, question_description, question_code_block, tags, user_id);
      res.status(201).json({
        message: 'Question created successfully',
        question: createdQuestion,
      });
    } catch (error) {
      res.status(500).json({
        message: 'An error occurred while creating the question',
        error: error.message,
      });
    }
  },
  getAllQuestions: async (req, res) => {
    try {
      const questions = await QuestionService.getAllQuestions();
      res.status(200).json({
        questions,
      });
    } catch (error) {
      res.status(500).json({
        message: 'An error occurred while retrieving the questions',
        error: error.message,
      });
    }
  },

  getQuestionDetails: (req, res) => {
    questionDetail(req.body, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "Database connection err!" });
      }
      return res.status(200).json({ data: result });
    });
  },
};



// createQuestion: (req, res) => {
  //   const {question, description, codeBlock, tags, postId, userId} = req.body;
  //   if (!question || !questionDescription)
  //     return res.status(400).json({ msg: "please provide question fields!" });
  //     questions(req.body, (err, result) => {
  //     if (err) {
  //       console.log(err);
  //       return res.status(500).json({ msg: "Database connection err and error!" });
  //     }
  //     return res.status(200).json({
  //       msg: "Question added successfully",
  //       data: result,
  //     });
  //   });
  // },