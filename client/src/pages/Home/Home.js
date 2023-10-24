import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/Context';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import hLogo from '../../assets/evangadi-logo-home.png';
// import Questions from '../../Components/Questions';
import AskQuestion from '../AskQueation/AskQueation';
// import MdArrowForwardIos from 'react-icons/md'

// const Home = ({ logout, question}) => {
//   const [userData] = useContext(UserContext); // Destructure only the userData from context
//   const [allQuestions, setAllQuestions] = useState([]); // Use useState for allQuestions
//   const navigate = useNavigate();

//   const fetchQuestions = async () => {
//     try {
//       const questionRes = await axios.get('http://localhost:4000/api/question');
//       setAllQuestions(questionRes.data.data);
//     } catch (err) {
//       console.log('Problem:', err);
//     }
//   };

//   useEffect(() => {
//     if (!userData.user) {
//       navigate('/login');
//     } else {
//       fetchQuestions(); // Call the function to fetch questions when userData is available
//     }
//   }, [userData.user, navigate]);

//   return (
//     <div className="bg-gray-100 h-screen text-center">
      
//       <div className=' border-2'>
//         <div className=''>
//         <Link to={"/"}>
//       <img className=' max-w-full ps-8 md:ps-20 h-4 md:h-6 relative top-8 ' src={hLogo} alt='' />
//       </Link>
//           <p className=' text-center ps-80 me-6 hover:text-orange-400 relative hidden md:inline-flex'>Home</p>
//           <p className=' hover:text-orange-400 relative hidden md:inline-flex'>How it works</p>
//           </div>
//         <div className="text-center relative top ps-64 md:ms-[500px]   md:bottom-6 ">
//           <button
//             className="bg-blue-500 hover-bg-blue-700 text-white font-medium py-2 px-10 rounded text-sm "
//             onClick={logout}>Log Out</button>
//         </div>
//       </div>

//       <Link to={"/AskQueation"}>
//       <button className="bg-blue-500 hover-bg-blue-700 text-white font-medium py-2 px-4 md:px-10 relative top-6 md:me-[900px] rounded text-sm me-80 "
//             onClick={question}>Ask Question {userData.question?.question}</button>
//             </Link>
//             <Questions/>
//           <button>
//             {allQuestions?.map((question, userName) => (
//               <li key={userName}>{question}</li>
//             ))}
//           </button>
//       <h1 className="text-2xl font-bold ps-60 text-center relative   md:ms-[500px]">
//           Welcome {userData.user?.display_name}
//         </h1>
        
//     </div>
//   );
// };
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

      // let questions = await axios.get("http://localhost:4000/api/questions");
      let questions = await axios.get('http://localhost:4000/api/questions');
      // console.log(">>>>>>>>Home useEffect >> fetchQuestions: 2");

      questions = questions.data.data;
      // console.log(">>>>>>>>Fetched questions:", questions);
      setAllQuestions(() => {
        return questions;
      });
    };
    fetchQuestions();
  }, [userData.user, navigate]);

  return (
    <>
      <div className="home">
        {/* show username in homepage */}
        <div className="home__top">
          {/* <Link to="/AskQuestion"> */}
          <button
            onClick={() => {
              navigate("/AskQuestion");
            }}
            className="home_topBtn"
          >
            Ask Question
          </button>


          <h4>Welcome: {userData.user?.display_name}</h4>
        </div>
        {/* <button onClick={logout}>Log out</button> */}
        <h3 className="home__question">Questions</h3>
        {/* <div> printed: {allQuestions[0]?.question_id}</div> */}
        <div className="home__questionLists">
          <div>
            {allQuestions?.map((question) => (
              <div key={question.question_id}>
                <Link
                  // to={/answer}
                  to={`/answer/:${question.question_id}`}
                  // state prop used to pass the data along the link
                  state={{
                    question: question,
                    currentUserId: userData.user?.id,
                  }}
                  className="Link"
                >
                  <AskQuestion show={question} />
                  {/* <MdArrowForwardIos className="MdArrowForwardIos" /> */}
                </Link>
              </div>
            ))}
          </div>
        </div>
        {allQuestions.length < 3 && (
          <div className="home__questionListsBottom" />
        )}
        {/* logout when the button clicked in which the function comes from app.js */}
        {/* <button onClick={logout}>Log out</button> */}
      </div>
    </>
  );
};

export default Home;
