import React from "react";

const SignupPage = () => {
  const handleSubmit = async () => {
    const data = {};
    data.username = document.getElementById("username-signup").value;
    data.password = document.getElementById("password-signup").value;
    console.log(data);
    const response = await fetch("/users/signup", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data),
    });
    return response;
  };

  return (
    <div className="signup">
      <h1>{"Sign UP"}</h1>
      <label>
        Username:
        <input type="text" id="username-signup" />
      </label>
      <label>
        Password:
        <input type="text" id="password-signup" />
      </label>
      <button className="button" id="signup-button" onClick={handleSubmit}>
        SIGN UP
      </button>
    </div>
  );
};

export default SignupPage;
