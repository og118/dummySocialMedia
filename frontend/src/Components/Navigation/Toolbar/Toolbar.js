import React from 'react'
import NavigationItems from './../NavigationItems/NavigationItems'
import classes from './Toolbar.module.css'
import ToggleButton from './../SideDrawer/ToggleButton/ToggleButton'

const toolbar = () => {
    return(
        <div className={classes.Toolbar}>
            <div className={classes.Title}>
                mySocial.com
            </div>
            <NavigationItems />
            <ToggleButton/>
            
        </div>
    )
}

export default toolbar;