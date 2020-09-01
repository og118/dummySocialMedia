import React, { Component } from "react";
import Posts from "./../../Containers/Posts/Posts";
import { withRouter } from "react-router-dom";
import Axios from "axios";
import classes from "./UserPage.module.css";
import userImg from "./../../assets/img/userImg.png";
import Spinner from "../UI/Spinner/Spinner";
import Aux from "./../../hoc/Auxilliary/Auxilliary";

class UserPage extends Component {
  state = {
    user: null,
    loading: null,
  };

  componentDidMount() {
    this.setState({ loading: true });
    const {
      match: { params },
    } = this.props;
    Axios({
      method: "GET",
      url: `${params.userId ? `http://localhost:9000/social/users/${params.userId}` : `http://localhost:9000/social/users/me`}`,
      withCredentials: true,
    }).then((res) => {
      console.log(res.data.data);
      this.setState({
        user: res.data.data,
        loading: false,
      });
    });
  }

  render() {
    const {
      match: { params },
    } = this.props;
    return (
      <Aux>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <div>
            <div className={classes.UserPanel}>
              <div className={classes.userNameImg}>
                <img src={userImg} className={classes.img} width="180px"></img>
                <p className={classes.Name}>
                  {this.state.user ? this.state.user.name : null}
                </p>
              </div>
              <div className={classes.Divider} ></div>
              <div className={classes.UserInfo}>
              <p className={classes.Username}>
                {this.state.user ? "u/" + this.state.user.username : null}
              </p>
              
        <span className={classes.Info}>Joined {this.state.user ? (new Date(this.state.user.createdAt)).toDateString() : null}<br></br></span>
                <span className={classes.Info}> {this.state.user ? this.state.user.posts.length : null} Posts<br></br></span> 
              </div>
            </div>
            <Posts user={this.state.user? this.state.user._id: null}/>
            {this.props.errmsg}
          </div>
        )}
      </Aux>
    );
  }
}

export default withRouter(UserPage);
