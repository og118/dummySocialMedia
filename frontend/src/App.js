import React, { Component } from "react";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import Posts from "./Containers/Posts/Posts";
import { Route } from "react-router-dom";
import Authenticate from "./Containers/Authentication/Authenticate";
import {withCookies} from 'react-cookie'

class App extends Component {
  state = {
    userId: null,
    username: null,
    login: null,
    posts: null
  };

  render() {
    
    return (
        <Layout cookies={this.props.cookies}>
          <Route path="/" exact render={() => <Posts />} />
          <Route path="/authenticate" render={() => <Authenticate cookies={this.props.cookies}/>} />

          {/* <Route path="/authenticate/signup" component={Signup} /> */}
        </Layout>

    );
  }
}

export default withCookies(App);
