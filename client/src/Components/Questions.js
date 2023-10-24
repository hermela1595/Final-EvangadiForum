import React from "react";

const Questions = ({ question, userName }) => {
  return (
    <div className="d-md-flex align-items-center justify-space-between">
      <div className="d-flex flex-md-column avatar-container">
        <img className="" src="" alt="" />
        <h6 className="">{userName}</h6>
      </div>
      <div className="ms-md-5 flex-grow-1">
        <h6 className="pt-2 relative top-10 me-80 md:me-[900px]">Questions{question}</h6>{" "}
      </div>
      <div className="d-none d-md-block ms-md-5">
        <i className="fa fa-angle-right "></i>
      </div>
    </div>
  );
};

export default Questions;
