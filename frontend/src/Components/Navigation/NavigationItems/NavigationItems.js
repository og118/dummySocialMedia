import React from 'react'
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = () => {
    
    return(
        <div className={classes.NavigationItems}>
            <NavigationItem link='/'>Home</NavigationItem>
            <NavigationItem link='/authenticate'>Login</NavigationItem>
        </div>
    )

};

export default navigationItems