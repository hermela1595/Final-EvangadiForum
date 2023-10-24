import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../context/Context'; 

function AskQuestion() {
  const [userData, setUserData] = useContext(UserContext);
  const [form, setForm] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/questions', {
        // id: userData.user.id,
        // question: form.question,
        // questionDescription: form.questionDescription,
        question: form.question,
        question_description: form.questionDescription,
        user_id: userData.user.id
      });
      
      navigate('/'); 
    } catch (error) {
      console.error('Error submitting the question', error);
    }
  };

  // return (
  //   <div className="p-4"> 
    return (
    <div className="container">
      <div className="askcover">
        <div className="askcover__steps">
          <h3>Steps to Write a good question</h3>
          <ul>
            <li>Summarize in a one-line title</li>
            <li>Describe in more detail</li>
            <li>Describe what you expect to happen</li>
            <li>Review your question and post</li>
          </ul>
        </div>
        <div className="askcover_question">
          <div className="askcover_ask">
            <h3>Ask question</h3>
            <Link to="/questionList">Go to question page</Link>
          </div>
          <div className="askcover__input">
            <div className="form_container">
              <form onSubmit={handleSubmit} action="submit">
                <input
                  name="question"
                  type="text"
                  className="askcover__qtitle"
                  placeholder="Title"
                  onChange={handleChange}
                />
                <br />
                <br />
                <textarea
                  name="questionDescription"
                  placeholder="Question Description"
                  onChange={handleChange}
                  style={{
                    border: "1px solid rgb(191, 191, 191)",
                    borderRadius: "5px ",
                    width: "93%",
                    resize: "none",
                    height: "150px",
                  }}
                ></textarea>

                <button className="btnpost">Post Your Question</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  //     <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
  //       <div className="mb-4">
  //         <label htmlFor="question" className="text-sm font-semibold text-gray-600">Question</label>
  //         <input
  //           type="text"
  //           name="question"
  //           value={form.question}
  //           onChange={handleChange}
  //           className="w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-500"
  //         />
  //       </div>
  //       <div className="mb-4">
  //         <label htmlFor="questionDescription" className="text-sm font-semibold text-gray-600">Question Description</label>
  //         <textarea
  //           name="questionDescription"
  //           value={form.questionDescription}
  //           onChange={handleChange}
  //           className="w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-500"
  //         />
  //       </div>

  //       {/* <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Submit</button> */}
  //     </form>
  //     <Link to="/Answers" className="bg-blue-500 hover:bg-orange-400 text-white font-medium py-2 px-10 rounded text-sm md:me-[900px]">Submit</Link> 
  //   </div>
  // );
}

export default AskQuestion