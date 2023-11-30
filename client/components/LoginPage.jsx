import React from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const handleSubmit = async () => {
    const data = {};
    data.username = document.getElementById("username").value;
    data.password = document.getElementById("password").value;
    console.log(data);
    const response = await fetch("/users", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log("result", result);
    if (result === "username not found") return navigate("/signup");
    if (result === "ok") return navigate("/homepage");
    // return response;
  };

  return (
    <div class="LoginPage">
      <div class="login">
        <h1>{"Login"}</h1>
        <label>
          Username:
          <input type="text" id="username" />
        </label>
        <label>
          Password:
          <input type="password" id="password" />
        </label>
        <button className="button" id="login-button" onClick={handleSubmit}>
          LOG IN
        </button>
      </div>
      <img class="whale" src="https://i.postimg.cc/yxqqGdWN/panda.png"></img>
    </div>
  );
};

export default LoginPage;
