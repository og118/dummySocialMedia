import React, { Component } from 'react'
import Modal from './../../Components/UI/Modal/Modal';
import Aux from './../Auxilliary/Auxilliary';
import Axios from 'axios'
import { withRouter } from 'react-router-dom';

const errorHandler = (WrappedComponent) => {
    return withRouter(class extends Component {
        state = {
            hasError: false,
            error: null,
        }
        
        componentDidMount () {
            Axios.interceptors.request.use(req => {
                this.setState({hasError: false, error: null})
                return req;
            })

            Axios.interceptors.response.use(res => {
                console.log(res);
                return res;
            }, err => {
                console.log(err.response.data)
                this.setState({error: err, hasError: true})  
                return (err)
            })
        }

        closeErrorHandler = () => {
            this.setState({
                error: null,
                hasError: false
            })
        }

        render() {
            let msg , modal;
            if(this.state.error) {
                if(this.state.hasError) {
                    msg = "Something went wrong"
                } 
                if(this.state.error.response.data.message) {
                    msg=this.state.error.response.data.message
                } 
            }
            if(this.state.hasError) {
                modal = <Modal show clicked={this.closeErrorHandler}><i class='fas fa-ban' style={{color: "red"}}></i> 

                {" "+msg}
                <br></br>
                </Modal>
            }
            return (
                <Aux>
                    {this.props.history.location.pathname==="/"? modal: null} 
                    <WrappedComponent {...this.props} errormsg={msg} />
                </Aux>
            );        
        }
    }    );
}



export default (errorHandler);