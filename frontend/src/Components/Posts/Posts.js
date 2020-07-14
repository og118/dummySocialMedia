import React, {Component} from 'react'
import Post from './Post/Post'
import Axios from 'axios'
import Spinner from '../UI/Spinner';
import SortBy from './SortBy/SortBy'

class Posts extends Component {
    state = {
        posts: null,
        postUpdated: true,
        sortby: '-createdAt'
    }


    componentDidUpdate(prevProps, prevState) {
        console.log('update')
        Axios({
            method: "GET",
            url: `http://localhost:9000/social/posts?sort=${this.state.sortby}`,
            headers: {
                "Content-Type": "application/json"
              }
            }).then(res => {
              
              if(prevState.sortby !== this.state.sortby) {
                  this.setState({
                      posts: res.data.data,
                      postUpdated: true
                  })
              }
            
            }).catch(err => {
                console.log(err);
            });
    }

    componentDidMount() {
        console.log('mount')
       Axios({
        method: "GET",
        url: `http://localhost:9000/social/posts`,
        headers: {
            "Content-Type": "application/json"
          }
        }).then(res => {
          this.setState({posts: res.data.data})
        }).catch(err => {
            console.log(err);
        });
    }

    // to get user when clicked
    //  userClicked = () => {
    //     Axios.get('http://localhost:9000/social/users/')
    //     .then(res => {
    //             console.log(res)
    //         }).catch(err => {
    //             console.log(err)
    //         })
    // }


    optionChangeHandler = (event) => {
        this.setState({
            sortby: event.target.value
        })

    }

    render() {
        let posts = <Spinner />

        if(this.state.posts) {
            console.log(this.state.posts)
            posts = this.state.posts.map(el =>{
                return(<Post 
                title={el.title}
                content={el.content}
                createdBy={el.user.username}
                date={el.createdAt}
                userClick={this.userClicked}
                upvoteCount={el.upVoteCount}
                downvoteCount={el.downVoteCount}
                />)
            }
                )
        }


        return(
            <div>
                <SortBy optionChange={this.optionChangeHandler}/>
                {
                  posts  
                }
            </div>
        )
    

    }
} 

export default Posts