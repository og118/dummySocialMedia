import React, { Component } from "react";
import Toolbar from "./../Navigation/Toolbar/Toolbar";
import Aux from "../../hoc/Auxilliary";
import SideDrawer from "./../Navigation/SideDrawer/SideDrawer";
import Axios from "axios";

class Layout extends Component {
  state = {
    showSideDrawer: false,
    isLoggedIn: false,
    username: null
    
  };

  componentDidUpdate(prevState) {
    Axios({
      method: "GET",
      url: `http://localhost:9000/social/users/isLoggedIn`,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
      .then((res) => {
        console.log(res.data.user);
        if (res.data.user !== prevState.username) {
          this.setState({
            isLoggedIn: true,
            username: res.data.user.username
          });
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }

  toggleSideBar = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };
  render() {
    return (
      <Aux>
        <Toolbar toggleSideBar={this.toggleSideBar} isLoggedIn={this.state.isLoggedIn} username={this.state.username} />
        <SideDrawer open={this.state.showSideDrawer} />
        {this.props.children}
      </Aux>
    );
  }
}

export default Layout;
