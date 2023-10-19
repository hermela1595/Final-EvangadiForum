import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../context/Context';
import { useNavigate } from 'react-router-dom';



const Home = ({logout}) => {
  const [userData, setUserData] = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData.user) navigate("/login");
  }, [userData.user, navigate]);

  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">
          Welcome {userData.user?.display_name}
        </h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-16 rounded"
          onClick={logout}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Home;
