import React from 'react';
import classes from './ToggleButton.module.css'

const ToggleButton = () => {
    return(
        <div className={classes.MenuIcon}>
            <div className={classes.MenuIconBar}></div>       
            <div className={classes.MenuIconBar}></div>
            <div className={classes.MenuIconBar}></div>
        </div>        
    )
}

export default ToggleButton
