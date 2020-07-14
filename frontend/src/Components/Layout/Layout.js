import React, {Component} from 'react'
import Toolbar from './../Navigation/Toolbar/Toolbar'
import Aux from '../../hoc/Auxilliary';
import SideDrawer from './../Navigation/SideDrawer/SideDrawer'
import Posts from './../Posts/Posts'


class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  toggleSideBar = () => {
    this.setState((prevState) => {
    return {showSideDrawer: !prevState.showSideDrawer}
    })
}
    render() { 
      return(
        <Aux>
          <Toolbar toggleSideBar={this.toggleSideBar}/>    
          <SideDrawer open={this.state.showSideDrawer}/>

          <Posts />
        </Aux>
      );
    }
  }
  
  export default Layout;