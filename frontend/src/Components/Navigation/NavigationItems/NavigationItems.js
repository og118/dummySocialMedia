import React from 'react'
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => {
    
    return(
        <div className={classes.NavigationItems}>
            <NavigationItem link='/' exact>Home</NavigationItem>
            {props.isLoggedIn ? <NavigationItem link='/me'>{props.username}</NavigationItem> : <NavigationItem link='/authenticate'>Login</NavigationItem>} 
        </div>
    )

};

export default navigationItems