
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/Context";
import axios from "axios";

const SignUp = () => {
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
  });

  const navigate = useNavigate();
  const [userData, setUserData] = useContext(UserContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:4000/api/users", form);

      const loginRes = await axios.post("http://localhost:4000/api/users/login", {
        email: form.email,
        password: form.password,
      });

      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });

      localStorage.setItem("auth-token", loginRes.data.token);
      navigate("/");
    } catch (err) {
      console.log("Problem:", err.response.data.msg);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen md:inline-flex lg:inline-flex items-center justify-center w-full p-10">
    <div className="bg-white rounded-md md:shadow-2xl w-99 p-12 ">
      <h1 className="text-2xl font-bold mb-4">Join the network</h1>

      <Link to="/login" className="text-blue-500">Already have an account?</Link>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="text"
            name="email"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md mb-2 "
          />
        </div>
        <div className=" block md:inline-flex lg:inline-flex relative justify-between">
        <div className="mb-4">
          <label htmlFor="firstName" className=" text-sm flex font-medium text-gray-700">First Name:</label>
          <input
            type="text"
            name="firstName"
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="lastName" className=" text-sm font-medium ms-4 text-gray-700">Last Name:</label>
          <input
            type="text"
            name="lastName"
            onChange={handleChange}
            className="mt-1 md:ms-4 p-2 w-full border rounded"
          />
        </div>
        </div>
        <div className="mb-4">
          <label htmlFor="userName" className="block text-sm font-medium text-gray-700">User Name:</label>
          <input
            type="text"
            name="userName"
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>

        <button className="bg-blue-500 text-white p-2  rounded hover:bg-orange-400" type="submit">Agree and Join</button>
      </form>
    </div>
    <div className='bg-gray-100  p-6  w-96 md:ms-16 md:w-[400px]'>
          <p className=' text-orange-400'>About</p>
          <p className='text-[30px] font-medium'>Evangadi Networks</p>
          <p>No matter what stage of life you are in, whether you’re just starting elementary school or being promoted to CEO of a Fortune 500 company, you have much to offer to those who are trying to follow in your footsteps.</p> <br/>
          <p>Wheather you are willing to share your knowledge or you are just looking to meet mentors of your own, please start by joining the network here.</p>
        </div>
    </div>
  );
};

export default SignUp;
