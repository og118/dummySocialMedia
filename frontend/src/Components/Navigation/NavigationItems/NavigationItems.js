import React, { Component } from 'react'
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'
import { withCookies } from 'react-cookie'


class NavigationItems extends Component {
    render() {
        let userLoggedin = this.props.cookies.get('userLogin')
        // console.log(userLoggedin)
        let user = <NavigationItem link='/authenticate' >Login</NavigationItem>
        if(userLoggedin) {
            user = <NavigationItem link='/me' >{userLoggedin.username}</NavigationItem>
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