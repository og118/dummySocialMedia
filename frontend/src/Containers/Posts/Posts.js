import React, {Component} from 'react'
import Post from './../../Components/Post/Post'
import Axios from 'axios'
import Spinner from './../../Components/UI/Spinner/Spinner';
import SortBy from './../../Components/SortBy/SortBy'
import CreatePostButton from './../../Components/CreatePost/CreatePostButton'
import { withCookies } from 'react-cookie'
import { withRouter } from 'react-router-dom'


class Posts extends Component {
    state = {
        posts: null,
        loading: true,
        sortby: '-createdAt',
    }

    componentDidMount() {
        console.log('cdm')
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
        let sortby = event.target.value + ",-createdAt";
            this.setState({loading: true})
            Axios({
            method: "GET",
            url: `http://localhost:9000/social/posts?sort=${sortby}`,
            headers: {
                "Content-Type": "application/json"
              },
            withCredentials: true
            }).then(res => {
                    this.setState({
                      posts: res.data.data,
                      loading: false
                  })

            
            }).catch(err => {
                console.log(err);
            });
    }

    

    createPostHandler = () => {
            this.props.history.push('/createPost')
    }

    modalShowHandler = () => {
        this.setState({
            modalShow: false
        })
    }



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
                // console.log(el)
                el.upvotes.forEach(e => {
                    // console.log(e)
                    if(e._id === id) {
                        userUpvote = true
                        // console.log('working')
                    }
                })
                el.downvotes.forEach(e => {
                    // console.log(e)
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
                <CreatePostButton clicked={this.createPostHandler} /> 
                <SortBy optionChange={this.optionChangeHandler}/>
                {
                  posts  
                }
            </div>
        )
    }
} 

export default withRouter(withCookies(Posts));