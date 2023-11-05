import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuthContext } from '../hooks/useAuthContext'

const Landing = () => {
    const { user } = useAuthContext();
    return (
        <div>
            {user && (<Navigate to="/" />)}

            <div className="info-container">
            <h1>
              Application Tracker
            </h1>
            <p>
              Track job searching progress, specifying the job opportunity
              details and always get accurate data about the status of your
              appliations
            </p>
            <span className="btn-cotainer">
              <Link to="/login">Login</Link>
            </span>
            <span className="btn-cotainer">
              <Link to="/register">Register</Link>
            </span>
          </div>
        </div>
        
    )

}

export default Landing;