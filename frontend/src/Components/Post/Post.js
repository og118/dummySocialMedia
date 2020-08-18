import React, {Component} from 'react'
import classes from './Post.module.css'
import Votes from './Votes/Votes'
import Aux from '../../hoc/Auxilliary/Auxilliary'
import ToggleFullPost from './ToggleFullPost/ToggleFullPost'
import Axios from 'axios'
import { withRouter } from 'react-router-dom'
 
class Post extends Component {
    state = {
        upvotes: this.props.upvoteCount,
        downvotes: this.props.downvoteCount,
        showFull: false,
        up: this.props.upvoted,
        down: this.props.downvoted,
    }
    
    componentWillReceiveProps(nextProps) {
        if(this.props !== nextProps) {
          this.setState({
            upvotes: nextProps.upvoteCount,
            downvotes: nextProps.downvoteCount,
            up: nextProps.upvoted,
            down: nextProps.downvoted
          });
        }
      }
    
    upHandler = () => {
        // console.log(this.props.id)
        // console.log('upclick')    
        // upvote request goes here
        Axios({
            method: "GET",
            url: `http://localhost:9000/social/posts/${this.props.postId}/upvote`,
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        }).then((res) => {
                if(res.data) {
                this.setState((prevState) => {
                    let upvotes = prevState.upvotes, downvotes = prevState.downvotes;
                    if(prevState.down){
                        downvotes--;
                        upvotes++;
                    }
                    else if(prevState.up){
                        upvotes--
                    } else {
                        upvotes++;
                    }
                    return {down: false, up: !prevState.up, upvotes: upvotes, downvotes: downvotes}
                }) 
            }
            }).catch(err =>
                console.log(err)
            ) 
    }

    downHandler = () => {
        // console.log('downclick', this.state.downvotes)
        Axios({
            method: "GET",
            url: `http://localhost:9000/social/posts/${this.props.postId}/downvote`,
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        }).then((res) => {
            if(res.data) {
            this.setState((prevState) => {
                let upvotes = prevState.upvotes , downvotes = prevState.downvotes;
                if(prevState.up){
                    upvotes--;
                    downvotes++;
                }
                else if(prevState.down) {
                    downvotes--;
                } else {
                    downvotes++;
                }
                
                return {up: false, down: !prevState.down, upvotes: upvotes, downvotes: downvotes}
            })}
        }).catch(err =>
                console.log(err)
            ) 
    }



    

    togglePostHandler = () => {
        this.setState((prevState) => {
            return({showFull: !prevState.showFull})
        })
    }

    calculateTime = (now, origin) => {
        let createdAt = (now-origin)/1000

        if(createdAt < 60) {
            createdAt = `${Math.floor(createdAt)} seconds ago`
        } else {
            createdAt = createdAt/60;
            // console.log(createdAt)
            if(createdAt < 60) {
                createdAt = `${Math.floor(createdAt)} minute${(createdAt>=2) ? 's ':' '}ago`
            } else {
                createdAt = createdAt/60;
                if(createdAt<24) {
                    createdAt = `${Math.floor(createdAt)} hour${(createdAt>=2) ? 's ':' '}ago`
                } else {
                    createdAt = createdAt/24
                    if(createdAt<30) {
                        createdAt = `${Math.floor(createdAt)} day${(createdAt>=2) ? 's ':' '}ago`
                    } else {
                        createdAt = createdAt/30
                        if(createdAt<12) {
                            createdAt=`${Math.floor(createdAt)} month${(createdAt>=2) ? 's ':' '}ago`
                        } else {
                            createdAt=createdAt/12
                            if(createdAt) {
                                createdAt=`${Math.floor(createdAt)} year${(createdAt>=2) ? 's ':' '}ago`
                            }
                        }

                    }
                }
            }
        }
        return createdAt;
    }

    render() {
        let origin = Date.parse(this.props.date);
        // console.log(this.props.title, new Date(this.props.date))
        let now = Date.now();
        // console.log(now)
        let contentReduced;
        if(this.props.content.length > 820) { 
             contentReduced = this.props.content.slice(0, 820) + "..."
        } else
         contentReduced = this.props.content.slice(0, 820)
        
        return(
            <Aux>
            <div className={classes.Post}>
                <div className={classes.Title}>{this.props.title}</div>

                <div className={classes.Time}>created by 
                    <span className={classes.Username} onClick={this.props.userClick}> {this.props.createdBy}</span>, {this.calculateTime(now, origin)}
                </div>

                <div className={classes.Content}>{  !this.state.showFull ? contentReduced : this.props.content}</div>

                <span className={classes.Votes}>
                    <hr></hr>
                    <Votes 
                        postId = {this.props.id}
                        upvotes={this.state.upvotes} 
                        downvotes={this.state.downvotes}
                        up={this.state.up}
                        down={this.state.down}
                        upHandler={this.upHandler}
                        downHandler={this.downHandler}
                    />
                </span>

            {this.props.content.length > 820 ? <ToggleFullPost togglePost={this.togglePostHandler} full={this.state.showFull}/> : null }
            </div>
            </Aux>
        );
    }
} 

export default (withRouter(Post))