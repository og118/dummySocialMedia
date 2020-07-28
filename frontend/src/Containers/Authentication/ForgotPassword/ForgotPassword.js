import React from "react";
import classes from "./ForgotPassword.module.css";
import Axios from 'axios'

const forgotPassword = (props) => {
  const forgotPasswordHandler = (event) => {
    event.preventDefault();
      let email = document.getElementsByName('email')[0].value;
      Axios({
        method: "POST",
        url: `http://localhost:9000/social/users/forgotPassword`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          email: email,
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
        <form className={classes.loginform}>
          <input type="text" placeholder="email" name='email'/>
          <button onClick={forgotPasswordHandler}>forgot password</button>
          <p className={classes.message} onClick={props.login}>
            Log-in
          </p>

          <p className={classes.message} onClick={props.signup}>
            Not registered? Create an account
          </p>
        </form>
      </div>
    </div>
  );
};

export default forgotPassword;
