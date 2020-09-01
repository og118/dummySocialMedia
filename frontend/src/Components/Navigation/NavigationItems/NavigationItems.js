import React, { Component } from 'react'
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'
import { withCookies } from 'react-cookie';
import UserNav from './UserNav/UserNav'
import Axios from 'axios';


class NavigationItems extends Component {
    logoutHandler = () => {
        let cookies = this.props.cookies
        cookies.remove('userLogin')
        console.log(cookies)
        
    }

    render() {
        let userLoggedin = this.props.cookies.get('userLogin')
        // console.log(userLoggedin)
        let user = <NavigationItem link='/authenticate' >Login</NavigationItem>
        if(userLoggedin) {
            user = <UserNav logout={this.logoutHandler}>{userLoggedin.username}  <i className="fas fa-angle-down"></i></UserNav>
        }
                                    
        return(
            <div className={classes.NavigationItems}>
                <NavigationItem link='/' exact>Home</NavigationItem>
                {user}
            </div>
        )
    }


};

export default withCookies(NavigationItems)