import React, { Component } from "react";
import classes from "./ForgotPassword.module.css";
import Axios from 'axios'
import { withRouter } from 'react-router-dom'
import Spinner from "../../../Components/UI/Spinner/Spinner";


class forgotPassword extends Component {
  state = {
    status : "",
    forgotPassword : null,
    resetPassword: null,
    loading: null,
    disabled: true
  }
  resetPasswordHandler = (event) => {
    event.preventDefault();
    let password = document.getElementsByName('password')[0].value;
    let passwordConfirm = document.getElementsByName('passwordConfirm')[0].value;
    let token = document.getElementsByName('token')[0].value;
    Axios({
      method: "PATCH",
      url: `http://localhost:9000/social/users/resetPassword/${token}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        password: password,
        passwordConfirm: passwordConfirm
      },
    }).then((res) => {
      console.log(res.data)
      this.setState({
        status: "Password Updated Successfully",
        resetPassword: true
      });
      setTimeout(() => {this.props.history.push("/")}, 1000)
    }).catch((err) => {
      console.log(err.response.data)
      if(err.response.data.error.errors){
      let errmsg = Object.keys(err.response.data.error.errors)
          let errors = []

          errmsg.map((el)=>{
            errors.push(err.response.data.error.errors[el].properties.message)
          })
          console.log(errors.join(', '))
          
          this.setState({
            resetPassword: false,
            status: errors.join(', ')
      })}
      else {
        this.setState({
          resetPassword: false,
          status: "Invalid/Expired token"
        })
      }
    })
    
  }

  forgotPasswordHandler = (event) => {
    this.setState({loading: true})
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
          this.setState({
            status: res.data.message,
            forgotPassword: true,
            loading: false
          })
        })
        .catch((err) => {
          this.setState({
            status: err.response.data.message,
            forgotPassword: false,
            loading: false
          })
          console.log(err.response.data);
        });

  };
  render() {
    let attachedClasses = []
    let content;
    if(this.state.forgotPassword) {
      attachedClasses.push(classes.Green)
    } else {
      attachedClasses.push(classes.Red)
    }

    if(this.state.resetPassword == false) {
      attachedClasses.pop(classes.Green);
      attachedClasses.push(classes.Red)
    }

    if(this.state.loading === true) {
      content = <Spinner />
    } else content = (<form className={classes.loginform}>
      <input type="text" placeholder="email" name='email'/>
      {this.state.forgotPassword ? <div><input type="text" placeholder="token" name='token'/>
      <input type="password" placeholder="New Password" name='password'/>
      <input type="password" placeholder="Confirm New Password" name='passwordConfirm'/></div> : null}
      {this.state.forgotPassword ? <button onClick={this.resetPasswordHandler}>reset password</button> : <button onClick={this.forgotPasswordHandler}>forgot password</button> }
      <span class={attachedClasses.join(' ')}>{this.state.status}</span>
      <p className={classes.message} onClick={this.props.login}>
        Log-in
      </p>

      <p className={classes.message} onClick={this.props.signup}>
        Not registered? Create an account
      </p>
    </form>)
  return (
    
    <div className={classes.loginpage}>
      <div className={classes.form}>
        {content}
      </div>
    </div>
  );
}
};

export default withRouter(forgotPassword);
