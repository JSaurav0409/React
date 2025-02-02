import React from "react";
import { Signup as SignupComponent } from "../components"; // Import the Signup component

function Signup() {
  return (
    <div className="py-8">
      {/* Add padding for consistent spacing */}
      <SignupComponent /> {/* Render the Signup component */}
    </div>
  );
}

export default Signup;
