import React from 'react'
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = () => {
    
    return(
        <div className={classes.NavigationItems}>
            <NavigationItem link='/' active>Home</NavigationItem>
            <NavigationItem link='/'>Login</NavigationItem>
        </div>
    )

};

export default navigationItems