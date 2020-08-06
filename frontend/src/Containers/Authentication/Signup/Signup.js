import React, { Component } from "react";
import classes from "./Signup.module.css";
import Axios from 'axios'
import {withRouter} from 'react-router-dom'

class signup extends Component {
  state = {
    signedUp: null,
    status: ""

  }
   signUp = (event) => {
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
          this.setState({
            signedUp: true,
            status: 'Account Created Successfully'
          })
          setTimeout(() => {this.props.history.push("/")}, 1000)
        })
        .catch((err) => {
          console.log(err.response.data)
          let errmsg = Object.keys(err.response.data.error.errors)
          let errors = []

          errmsg.map((el)=>{
            errors.push(err.response.data.error.errors[el].properties.message)
          })
          console.log(errors.join(', '))
          
          this.setState({
            signedUp: false,
            status: errors.join(', ')
          })
        });

  };
  render() {
    let attachedClasses = []
    if(this.state.signedUp) {
      attachedClasses.push(classes.Green)
    } else {
      attachedClasses.push(classes.Red)
    }
    console.log(attachedClasses)
  return (
    <div className={classes.loginpage}>
      <div className={classes.form}>
        <form className={classes.registerform}>
          <input type="text" placeholder="name" name="name" />
          <input type="text" placeholder="email address" name="email"/>
          <input type="text" placeholder="username" name="username" />
          <input type="password" placeholder="password" name="password"/>
          <input type="password" placeholder=" confirm password" name="confirmPassword" />
          <button onClick={this.signUp}>create</button>
          <span class={attachedClasses.join(' ')}>{this.state.status}</span>
          <p className={classes.message} onClick={this.props.login}>
            Already registered? <span>Sign In</span>
          </p>
        </form>
      </div>
    </div>
  );
}
};

export default withRouter(signup);
