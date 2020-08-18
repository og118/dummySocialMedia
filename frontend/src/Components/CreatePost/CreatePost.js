import React, { Component } from "react";
import classes from "./CreatePost.module.css";
import Axios from "axios";
import {withRouter} from 'react-router-dom'

class createPost extends Component {
  state = {
    status: null,
    created: null
  };
  createPostHandler = (event) => {
    event.preventDefault();
    // console.log(document.getElementsByName("title")[0].value);
    let title = document.getElementsByName("title")[0].value;
    let content = document.getElementsByName("content")[0].value;

    Axios({
      method: "POST",
      url: `http://localhost:9000/social/posts`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        title: title,
        content: content,
      },
      withCredentials: true,
    }).then((res) => {
      if (res.data) {
        console.log(res.data.data);
        this.setState({ status: "Post created Successfully", created: true });
        setTimeout(() => {this.props.history.push("/")}, 1000)
      }
      else if (res.response) {
        console.log(res.response.data.message) 
        this.setState({ status: res.response.data.message, created: false });

      }
    });
  };
  render() {
    let attachedClasses = [];
    if (this.state.created) {
      attachedClasses.push(classes.Green);
    } else {
      attachedClasses.push(classes.Red);
    }
    return (
      <div className={classes.CreatePost}>
        <form className={classes.form}>
          <label>Create a Post</label>
          <hr></hr>
          <input placeholder="Title" name="title"></input>
          <textarea
            placeholder="Your ideas and thoughts go here"
            name="content"
          ></textarea>
          <p className={attachedClasses.join(' ')}>{this.state.status}</p>
          <button onClick={this.createPostHandler}>Post</button>
        </form>
      </div>
    );
  }
}

export default withRouter(createPost);
