import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/Context";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AskQuestion from "../AskQueation/AskQueation";
import hLogo from "../../assets/evangadi-logo-home.png";
// import Questions from '../../Components/Questions';

// import MdArrowForwardIos from 'react-icons/md'

const Home = ({ logout }) => {
  const [userData, setUserData] = useContext(UserContext);
  const [page, setPage] = useState("Home");
  const [allQuestions, setAllQuestions] = useState([]);
  let [currrentQuestion, setCurrrentQuestion] = useState([]);
  let q = [];
  const navigate = useNavigate();
  useEffect(() => {
    if (!userData.user) navigate("/login");
    // console.log(">>>>>>>>Home useEffect: 0");
    const fetchQuestions = async () => {
      // console.log(">>>>>>>>Home useEffect >> fetchQuestions: 1");

      let questions = await axios.get("http://localhost:4000/api/questions/all");
      // console.log(">>>>>>>>Home useEffect >> fetchQuestions: 2");

      questions = questions.data.questions;
      
      // console.log(">>>>>>>>Fetched questions:", questions);
      setAllQuestions(() => {
        return questions;
      });
    };
    fetchQuestions();
  }, [userData.user, navigate]);
  console.log(allQuestions);

  return (
    <>
      <div className=" md:inline-flex h-12 w-full md:h-24 cursor-pointer ms-6 md:ms-16 duration-300 relative top-4">
        <Link to={"/"}>
          <img
            className="max-w-full h-5 md:h-8 mt-6 md:mt-6 ms-16 "
            src={hLogo}
            alt=""
          />
        </Link>

        {/* <LuMenu className='relative ms-96 bottom-5 '/> */}

        <div className=" hidden md:inline-flex  relative items-center">
          <p className="me-6 md:ms-[500px] hover:text-orange-400">Home</p>
          <p className="me-6 hover:text-orange-400">How it works</p>
          <Link to={"/login"}>
            <button
              onClick={logout}
              className="relative h-8 w-32  bg-blue-500 text-white font-semibold pt-1 rounded-md hover:bg-orange-400 focus:outline-none text-center bottom-1"
            >
              Log out
            </button>
          </Link>
        </div>
      </div>
      <div className="bg-gray-100 p-4">
        {/* Show username in homepage */}
        <div className="bg-white p-4 rounded shadow h-52">
          <div className="flex justify-between items-center">
            <button
              onClick={() => navigate("/AskQuestion")}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Ask Question
            </button>
            <h4 className="text-xl">Welcome: {userData.user?.display_name}</h4>
          </div>

          <h3 className="text-2xl font-bold mt-4">Questions</h3>
          <div className="mt-4">
            {allQuestions?.map((question) => (
              <div key={question.question_id} className="mb-4">
               
                <Link
                  to={`/answer/${question.question_id}`}
                  state={{
                    question: question,
                    currentUserId: userData.user?.id,
                  }}
                  className="text-blue-500 hover:underline"
                >
                   <div>
                  {question.question}
                </div>
                  
                  {/* You can add an icon here using a suitable icon library */}
                </Link>
              </div>
            ))}
          </div>
          {allQuestions?.length < 3 && <div className="mt-4" />}
          {/* Logout when the button clicked in which the function comes from app.js */}
        </div>
      </div>
          
    </>
  );
};

export default Home;
