import React, { Component } from "react";
import classes from "./Login.module.css";
import Axios from "axios";

class Login extends Component {
  state = {
    userInfo : {email: null, username: null},
    password : null,
  }


  componentDidUpdate() {
    console.log(this.state)
    Axios({
      method: "POST",
      url: `http://localhost:9000/social/users/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: this.state.userInfo.email,
        username: this.state.userInfo.username,
        password: this.state.password,
      },
      withCredentials: true
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }


  login = (event) => {
    event.preventDefault();
    let password = document.getElementsByName("password")[0].value;
    let userInfo = {email: null, username: null}
    userInfo[this.props.loginType] = document.getElementsByName(this.props.loginType)[0].value;
    console.log(password, userInfo);
    // let password = document.getElementsByName("password")[0].value;
    // userInfo[this.props.loginType] = document.getElementsByName(this.props.loginType)[0].value;
    // console.log(this.state, password, userInfo);
    this.setState({
      userInfo: userInfo,
      password: password
    })
  }

  render() {
    return (
      <div className={classes.loginpage}>
        <div className={classes.form}>
          <form className={classes.loginform}>
            <input
              type="text"
              placeholder={this.props.loginType}
              name={this.props.loginType}
            />
            <input type="password" placeholder="password" name="password" />
            <button onClick={this.login}>login</button>
            <p className={classes.message} onClick={this.props.loginEmail}>
              Log-in with{" "}
              {this.props.loginType === "email" ? "username" : "email"}
            </p>
            <p className={classes.message} onClick={this.props.forgotPassword}>
              forgot Password?
            </p>
            <p className={classes.message} onClick={this.props.signup}>
              Not registered? Create an account
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
