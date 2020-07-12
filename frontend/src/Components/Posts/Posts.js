import React, {Component} from 'react'
import Post from './Post/Post'
import Axios from 'axios'

class Posts extends Component {
    componentDidMount() {
       Axios({
        method: "GET",
        url: "http://127.0.0.1:9000/social/posts",
        headers: {
            "Content-Type": "application/json"
          }
        }).then(res => {
          console.log(res);
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return(
            <div>
                <Post />
                <Post />
            </div>

        );
    }
} 

export default Posts