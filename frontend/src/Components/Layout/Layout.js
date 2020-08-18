import React, { Component } from "react";
import Toolbar from "./../Navigation/Toolbar/Toolbar";
import Aux from "../../hoc/Auxilliary/Auxilliary";
import SideDrawer from "./../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  toggleSideBar = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar cookies={this.props.cookies} toggleSideBar={this.toggleSideBar}/>
        <SideDrawer cookies={this.props.cookies} open={this.state.showSideDrawer} />
        {this.props.children}
      </Aux>
    );
  }
}

export default Layout;
