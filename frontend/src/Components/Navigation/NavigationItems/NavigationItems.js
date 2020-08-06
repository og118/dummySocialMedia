import React, { Component } from 'react'
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'
import Axios from 'axios'


class NavigationItems extends Component {
    render() {
        return(
            <div className={classes.NavigationItems}>
                <NavigationItem link='/' exact>Home</NavigationItem>
                {this.props.isLoggedIn ? <NavigationItem link='/me'>{this.props.username}</NavigationItem> : <NavigationItem link='/authenticate'>Login</NavigationItem>} 
            </div>
        )
    }


};

export default NavigationItems