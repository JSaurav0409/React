import React from "react";
import { Login as LoginComponent } from "../components"; // Import the Login component

function Login() {
  return (
    <div className="py-8">
      {/* Add padding for consistent spacing */}
      <LoginComponent /> {/* Render the Login component */}
    </div>
  );
}

export default Login;
