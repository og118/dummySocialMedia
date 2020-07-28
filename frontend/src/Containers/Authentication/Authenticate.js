import React, { Component } from "react";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import ForgotPassword from "./ForgotPassword/ForgotPassword";

class Authenticate extends Component {
  state = {
    loginEmail: false,
    signup: false,
    forgotPassword: false,
  };



  loginEmailHandler = () => {
    this.setState((prevState) => {
      return { loginEmail: !prevState.loginEmail, forgotPassword: false };
    });
  };

  forgotPasswordHandler = () => {
      this.setState((prevState) => {
          return {forgotPassword: true}
      })
  }

  signupLoginToggleHandler = () => {
    this.setState((prevState) => {
      return { signup: !prevState.signup, forgotPassword: false};
    });
  };

  render() {

    if (this.state.signup) {
      return <Signup login={this.signupLoginToggleHandler} />;
    } else if(this.state.forgotPassword) {
        return <ForgotPassword signup={this.signupLoginToggleHandler} login={this.loginEmailHandler}/>
    }
    else {
      return (
        <Login
          loginEmail={this.loginEmailHandler}
          loginType={this.state.loginEmail ? "email" : "username"}
          signup={this.signupLoginToggleHandler}
          forgotPassword={this.forgotPasswordHandler}
        />
      );
    }
  }
}

export default Authenticate;
