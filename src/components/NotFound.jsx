import React from "react";

import {
  FaExclamationTriangle,
  FaArrowLeft,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

const NotFound = () => {

  const navigate = useNavigate();

  return (
    <div className="notfound-page">

      <div className="notfound-card">

        {/* ERROR ICON */}
        <div className="notfound-icon">
          <FaExclamationTriangle />
        </div>

   
        <h1 className="notfound-code">
          404
        </h1>

      
        <h2 className="notfound-title">
          Page Not Found
        </h2>

       
        <p className="notfound-text">
          The page you are looking for
          doesn&apos;t exist or has been moved.
        </p>

        <button
          className="notfound-btn"
          onClick={() => navigate("/")}
        >

          <FaArrowLeft />

          <span>
            Back To Home
          </span>

        </button>

      </div>

    </div>
  );
};

export default NotFound;