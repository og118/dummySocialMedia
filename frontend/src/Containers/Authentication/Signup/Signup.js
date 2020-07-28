import React from "react";
import classes from "./Signup.module.css";
import Axios from 'axios'

const signup = (props) => {
  const signUp = (event) => {
    event.preventDefault();
    let name = document.getElementsByName("name")[0].value;
    let email = document.getElementsByName("email")[0].value;
    let username = document.getElementsByName("username")[0].value;
    let password = document.getElementsByName("password")[0].value;
    let passwordConfirm = document.getElementsByName("confirmPassword")[0].value;

      Axios({
        method: "POST",
        url: `http://localhost:9000/social/users/signup`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          name: name,
          email: email,
          username: username,
          password: password,
          passwordConfirm: passwordConfirm
        },
      })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.response.data);
        });

  };
  return (
    <div className={classes.loginpage}>
      <div className={classes.form}>
        <form className={classes.registerform}>
          <input type="text" placeholder="name" name="name" />
          <input type="text" placeholder="email address" name="email"/>
          <input type="text" placeholder="username" name="username" />
          <input type="password" placeholder="password" name="password"/>
          <input type="password" placeholder=" confirm password" name="confirmPassword" />
          <button onClick={signUp}>create</button>
          <p className={classes.message} onClick={props.login}>
            Already registered? <span>Sign In</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default signup;
