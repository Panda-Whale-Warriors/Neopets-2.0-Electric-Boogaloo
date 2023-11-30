import React from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();
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
    const result = await response.json();
    console.log("result---->", result);
    // if (result === "username not found") return navigate("/signup");
    if (result === "ok") return navigate("/homepage");
  };

  return (
    <div class="LoginPage">
      <div className="login">
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
      <img class="whale" src="https://i.postimg.cc/yxqqGdWN/panda.png"></img>
    </div>
  );
};

export default SignupPage;
