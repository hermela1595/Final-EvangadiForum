const router = require("express").Router();


const {
  createQuestion,
  // getAllQuestions,
  getAllQuestions,
} = require("./question.controler");

router.post("/", createQuestion);
router.get("/all", getAllQuestions);
// router.get("/", getQuestionDetails);




module.exports = router;





