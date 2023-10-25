import React from "react";
import hLogo from '../../assets/evangadi-logo-home.png';
import { LuMenu } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";

const Nav = (logout) => {
  return (
   
    // <div className=' md:inline-flex h-12 w-full md:h-24 cursor-pointer ms-6 md:ms-16 duration-300 '>
    //   <Link to={"/"}>
    //   <img className='max-w-full h-5 md:h-10 mt-6 md:mt-6 ms-16 ' src={hLogo} alt='' />
    //   </Link>
      
    //   <LuMenu className='relative ms-96 bottom-5 '/>

    //   <div className=' hidden md:inline-flex mt-10 relative '>
    //     <p className='me-6 hover:text-orange-400'>Home</p>
    //     <p className='me-6 hover:text-orange-400'>How it works</p>
    //     <Link to={"/login"}>
    //     <button className="relative h-8 w-40 bg-blue-500 text-white font-semibold pt-1 rounded-md hover:bg-orange-400 focus:outline-none text-center bottom-1">
    //       Sign in
    //     </button>
    //     </Link>
    //   </div>
    // </div>
    <div className="header">
    <nav className="header__nav">
      <div className="header__navLeft">
        <img
          src="https://www.evangadi.com/themes/humans//assets/images/misc/evangadi-logo-home.png"
          alt="logo"
        />
      </div>
      <div className="header__navRight">
        <Link to="/home" className="Link">
          <li>Home</li>
        </Link>
        <li>How it Works</li>
        <li>
          <button onClick={logout} className="header__navBtn">
            {localStorage.getItem("auth-token") ? "LogOut" : "SIGN IN"}
          </button>
        </li>
      </div>
    </nav>
  </div>
  );
};

export default Nav;
