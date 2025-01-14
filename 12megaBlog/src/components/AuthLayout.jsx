// Authentication Layout : Mechanism to protect route / pages.
// File name and Function name can be different from each other.

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    /*
    if (authStatus === true) {
      navigate("/")
    } else if (authStatus === false) {
      navigate("/login"); // Redirect the user to the login page 
    }
    */

    // let authValue = authStatus === true ? true : false;

    //TODO: Make it simpler to understand
    // If the user is authenticated but the current authStatus does not match the expected authenticated state
    if (authentication && authStatus !== authentication) {
      navigate("/login"); // Redirect the user to the login page
    }
    // If the user is not authenticated but the current authStatus does not match the expected unauthenticated state
    else if (!authentication && authStatus !== authentication) {
      navigate("/"); // Redirect the user to the home page
    }

    setLoader(false); // Once the authentication status is fetched, disable the loading state
  }, [authStatus, navigate, authentication]); // Dependency array ensures this effect runs whenever `authStatus`, `navigate`, or `authentication` changes

  return loader ? <h1>Loading...</h1> : <>{children}</>;
}
