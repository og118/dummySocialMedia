import React, {Component} from 'react'
import classes from './Post.module.css'

class Post extends Component {
    render() {
        return(
            <div className={classes.Post}>
                <div className={classes.Title}>Title</div>
                <div className={classes.Time}>created by User at time</div>
                <div className={classes.Content}>Content</div>
            </div>
        );
    }
} 

export default Post