import React, { Component } from "react";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import Posts from "./Containers/Posts/Posts";
import { Route } from "react-router-dom";
import Authenticate from "./Containers/Authentication/Authenticate";
import { withCookies } from "react-cookie";
import CreatePost from "./Components/CreatePost/CreatePost";
import errorHandler from "./hoc/ErrorHandler/ErrorHandler";


class App extends Component {
  render() {
    return (
    
        <Layout cookies={this.props.cookies}>
          <Route path="/" exact render={() => <Posts />} />
          <Route
            path="/authenticate"
            render={() => <Authenticate cookies={this.props.cookies} errormsg={this.props.errormsg} />}
          />
          <Route
            path="/createPost"
            render={() => <CreatePost cookies={this.props.cookies} />}
          />

          {/* <Route path="/authenticate/signup" component={Signup} /> */}
        </Layout>
      
    );
  }
}

export default withCookies(errorHandler(App));
