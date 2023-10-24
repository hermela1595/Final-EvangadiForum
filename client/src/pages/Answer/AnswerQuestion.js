import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import AskQuestion from "../AskQueation/AskQueation";
import { UserContext } from "../../context/Context";


const AnswerQuestion = (props) => {
  //      let { questionId } = useParams();  returns ':7'
  //       console.log(typeof questionId);
  //      questionId = parseInt(questionId?.slice(1, 2));

  //      const [answer, setAnswer] = useState({});
  //      const [prevAnswers, setPrevAnswers] = useState();

  //       get access to the data on state
  //      const location = useLocation();
  //      const { question, currentUserId } = location.state;
  //       console.log("Location data", question);

  //      const handleChange = async (e) => {
  //         console.log(e.target.value);
  //        await setAnswer({
  //          answer: e.target.value,
  //          questionId: question.question_id,
  //          userId: currentUserId,
  //        });
  //      };
  //      const handleSubmit = async (e) => {
  //        e.preventDefault();
  //         console.log(">>>>> post answer -1");
  //        try {
  //           console.log(">>>>> post answer 0");
  //           console.log(answer);
  //           await axios.post("http:localhost:4000/api/questions", {
  //             answer: answer.answer,
  //           });
  //          await axios.post("http:localhost:4000/api/answers", {
  //            answer: answer.answer,
  //            questionId: answer.questionId,
  //            userId: answer.userId,
  //          });
  //           console.log(">>>>> post answer 1");
  //           console.log(">>>>>>>>  your answer is submitted");
  //          window.location.reload(false);

  //           If set to true, the browser will do a complete
  //            page refresh from the server and not from the
  //           cached version of the page.
  //        } catch (err) {
  //           console.log(">>>>>>>> ERROR  your answer is not submitted");
  //          console.log("Answers can't be submitted: ", err);
  //        }
  //      };

  //      useEffect(() => {
  //         setAskedQuestion(question);
  //        const fetchAnswers = async () => {
  //          const answers = await axios.get(
  //            "http:localhost:4000/api/answers/${questionId}"
  //          );
  //           console.log(answers.data);
  //           console.log(answers.data.data);
  //          setPrevAnswers(() => {
  //            return answers.data?.data;
  //          });
  //           console.log(">>>>>>prevAnswers ", prevAnswers);
  //        };
  //        try {
  //          fetchAnswers();

  //          console.log(">>>>> Successfully fetched answers.");
  //        } catch (err) {
  //          console.log(">>>>> Can't fetch answers.");
  //        }
  //      }, []);
  //      return (
  //        <div className="answer">
  //          <div className="answer__top">
  //            <div className="answer__header">
  //              <p>Question</p>
  //              {/* <p>'the question goes here?'{questionId}</p> */}
  //              <p>{question?.question}</p>
  //              <p>{question?.question_description}</p>
  //            </div>

  //            <div className="answer__title">
  //              {prevAnswers?.length != 0 && <h4>Answer From the others</h4>}
  //            </div>
  //            <div className="answer__list">
  //              <div>
  //                {prevAnswers?.map((prevAnswer) => (
  //                  <div key={prevAnswer.answer_id}>
  //                    <AskQuestion show={prevAnswer} />
  //                  </div>
  //                ))}
  //              </div>
  //            </div>
  //          </div>
  //          <div className="answer__bottom">
  //            <div>
  //              <center>
  //                <div className="abtext">Answer The top Question</div>
  //              </center>
  //              <center>
  //                <div className="answerext">Answer The top Question</div>
  //              </center>

  //              <div className="answer__form">
  //                <form onSubmit={handleSubmit}>
  //                  <textarea
  //                    onChange={handleChange}
  //                    name="answerField"
  //                    placeholder="Your Answer ..."
  //                    style={{
  //                      border: "1px solid rgb(191, 191, 191)",
  //                      borderRadius: "5px ",
  //                      width: "100%",
  //                      resize: "none",
  //                      height: "150px",
  //                    }}
  //                  ></textarea>
  //                  <button className="answer__formBtn">Post your Answer</button>
  //                </form>
  //              </div>
  //            </div>
  //          </div>
  //        </div>
  //      );

  const [userData, setUserData] = useContext(UserContext);
  const [post, setPost] = useState({});
  const [form, setForm] = useState({});
  const [answer, setAnswer] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  console.log(userData.singleQuestion);
  useEffect(() => {
    if (!userData.user) {
      navigate("/login");
    }
    const fetch = async () => {
      const response = await axios.post(
        "http://localhost:4000/api/questions/id",
        {
        //   post_id: userData.singleQuestion.post_id,
        }
      );
      // console.log(response);
      setPost(response.data.data);
    };
    fetch();
  }, [userData.user]);

  useEffect(() => {
    const get = async () => {
      const res = await axios.post("http://localhost:4000/api/answers/all", {
        // question_id: userData.singleQuestion.question_id,
      });
      console.log(res);
      setAnswer(res.data.data);
    };
    get();
  }, [answer.length]);

  console.log(post);
  const handleChange = (e) => {
    setForm({ [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:4000/api/answers", {
      answer: form.answer,
      user_id: userData.user.id,
    //   question_id: post.question_id,
    });
    if (answer.length == 0) {
      setAnswer([""]);
      console.log(answer);
    } else {
      setAnswer([]);
    }

    setForm({ answer: "" });
  };
  console.log(answer);
  console.log(post);

  return (
    <div className="answer">
      <hr />
      <div className="answer__conatiner">
        <h5> Question</h5>
        <h5 className="question__line mb-3">{post?.question}</h5>
        <p style={{ marginTop: "-15px", fontSize: "10px" }}>
          {post?.question_description}
        </p>
        <hr />
        <h5 className="answer__community">Answer From The Community</h5>
        <hr />
        {answer &&
          answer?.map((item) => (
            <div>
              <div className="answer__info">
                <div className="question__icon">
                  <div className="icon">
                    <span>
                      {/* <AccountCircleTwoToneIcon style={{ fontSize: "60px" }} /> */}
                      <p className="mx-3"> {item.user_name}</p>
                    </span>
                  </div>
                  <div className="answer__desc mt-4">{item.answer}</div>
                </div>
              </div>
            </div>
          ))}

        <div className="answer__box ">
          <div className="answer__topQuestion">Answer The Top Questions</div>

          <div className="answer__link link mb-1 ">
            <Link to="/"> Go to question page</Link>
          </div>
          <br />

          <form onSubmit={handleSubmit}>
            <textarea
              className="question__form "
              name="answer"
              id=""
              cols="110"
              rows="10"
              placeholder="Your Answer here"
              value={form.answer}
              onChange={handleChange}
            ></textarea>
            <br />
            <br />
            <div className="answer__button">
              <button>Post Your Answer</button>
            </div>
          </form>
        </div>
      </div>
         
    </div>
  );
};

export default AnswerQuestion;
