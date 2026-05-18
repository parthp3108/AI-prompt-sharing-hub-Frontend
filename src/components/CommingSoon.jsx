import React from "react";

import {
  FaRocket,
  FaClock,
} from "react-icons/fa";

const ComingSoon = () => {
  return (
    <div className="coming-soon-page">

      <div className="coming-soon-card">

       
        <div className="coming-icon">
          <FaRocket />
        </div>

      
        <h1 className="coming-title">
          Coming Soon
        </h1>

     
        <p className="coming-subtitle">
          We are building something amazing for you.
          Stay tuned for the next big feature launch.
        </p>

      
        <div className="coming-status">
          <FaClock />

          <span>
            Under Development
          </span>
        </div>

       
        <button className="coming-btn">
          Notify Me
        </button>

      </div>

    </div>
  );
};

export default ComingSoon;