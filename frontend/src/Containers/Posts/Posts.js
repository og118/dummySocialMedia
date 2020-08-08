import React, {Component} from 'react'
import Post from './../../Components/Post/Post'
import Axios from 'axios'
import Spinner from './../../Components/UI/Spinner/Spinner';
import SortBy from './../../Components/SortBy/SortBy'
import CreatePostButton from './../../Components/CreatePost/CreatePostButton'
import AuthContext from '../../context/auth-context';
import {withCookies} from 'react-cookie'

class Posts extends Component {
    state = {
        posts: null,
        loading: true,
        sortby: '-createdAt'
    }

    


    componentDidUpdate(prevProps, prevState) {
        if(prevState.sortby !== this.state.sortby) {
            this.setState({
                loading: true
            })
        }
        Axios({
            method: "GET",
            url: `http://localhost:9000/social/posts?sort=${this.state.sortby}`,
            headers: {
                "Content-Type": "application/json"
              },
            withCredentials: true
            }).then(res => {
              
              if(prevState.sortby !== this.state.sortby) {
                  this.setState({
                      posts: res.data.data,
                      loading: false
                  })
              }
            
            }).catch(err => {
                console.log(err);
            });
    }

    componentDidMount() {
       Axios({
        method: "GET",
        url: `http://localhost:9000/social/posts`,
        headers: {
            "Content-Type": "application/json"
        },
        withCredentials: true
        }).then(res => {
          this.setState({posts: res.data.data, loading: false})
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

    static contextType = AuthContext

    render() {
        let posts = <Spinner />
        let cookies = this.props.cookies;
        let userLoggedin = cookies.get('userLogin')
        let id =" ";
        if(userLoggedin) {
            id = userLoggedin.id
        }

        if(!this.state.loading) {
            posts = this.state.posts.map(el =>{
                let userUpvote = false, userDownvote = false
                console.log(el)
                el.upvotes.forEach(e => {console.log(e)
                    if(e._id === id) {
                        userUpvote = true
                        console.log('working')
                    }
                })
                el.downvotes.forEach(e => {console.log(e)
                    if(e._id === id) {
                        userDownvote = true
                    }
                })

                return(<Post 
                postId={el._id}
                title={el.title}
                content={el.content}
                createdBy={el.user.username}
                date={el.createdAt}
                userClick={this.userClicked}
                upvoteCount={el.upVoteCount}
                downvoteCount={el.downVoteCount}
                upvoted = {userUpvote}
                downvoted = {userDownvote}
                />)
            }
                )
        }


        return(
            <div>
                <CreatePostButton clicked={this.showCreateScreenHandler} /> 
                <SortBy optionChange={this.optionChangeHandler}/>
                {
                  posts  
                }
            </div>
        )
    

    }
} 

export default withCookies(Posts)