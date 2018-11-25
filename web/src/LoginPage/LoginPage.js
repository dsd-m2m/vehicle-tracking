import React from 'react';
import { Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login';

import { PostData } from '../_services';
import '../_designs/login.css';
import '../_designs/design.css'


class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loginError: false,
            redirect: false
        };

        this.signup = this.signup.bind(this);
    }

    signup(res) {
        let socialToken = res.tokenId;
        let user = {
            name:res.w3.ig
        };
        if (socialToken) {
            PostData('signup', socialToken).then((result) => {
                let responseJson = result;
                console.log(responseJson);
                localStorage.setItem("userData",JSON.stringify(user));
                localStorage.setItem("jwt", JSON.stringify(responseJson.token));
                this.setState({redirect: true});
            }).catch(e => {
                this.setState({loginError:true});
                console.log(e);
            });
        } else {}
    }


    render() {
        if (this.state.redirect || localStorage.getItem('userData')) {
            return (<Redirect to={'/'}/>)
        } 
        if(this.state.loginError){
            console.log("Login Error");
            return <div className="srvDown">
                    <img src="pictures/srvDown.jpg" alt="Server Is Down"/>
                   </div>
        }

        const responseGoogle = (response) => {
            console.log(response);
            this.signup(response);
        }
        return (
            <div className="Lpage">
                <div className="sidenav">
                    <a href="https://www.fer.unizg.hr/rasip/dsd/projects/m2m">About</a>
                    <a href="mailto:tomislav.skokovic@fer.hr">Contact</a>
                </div>
                <div className="user_authorization">
                    <GoogleLogin
                        clientId="758979408479-h8rgnvkfhro2o2i3q3idek10r5cbt4u3.apps.googleusercontent.com"
                        buttonText="Login with Google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage }; 