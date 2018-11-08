import React from 'react';
import { Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';

import { PostData } from '../_services';
import { login } from '../_designs'


class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loginError: false,
            redirect: false
        };

        this.signup = this.signup.bind(this);
    }

    signup(res, type) {
        let postData;

        if (type === 'google' && res.w3.U3) {
            postData = {
              name: res.w3.ig,
              provider: type,
              email: res.w3.U3,
              provider_id: res.El,
              token: res.Zi.access_token,
              provider_pic: res.w3.Paa
            };
        }

        if (postData) {
            PostData('signup', postData).then((result) => {
                let responseJson = result;
                sessionStorage.setItem("userData", JSON.stringify(responseJson));
                this.setState({redirect: true});
        });
        } else {}
    }

    render() {
        if (this.state.redirect || sessionStorage.getItem('userData')) {
            return (<Redirect to={'/home'}/>)
        }

        const responseGoogle = (response) => {
            console.log("google console");
            console.log(response);
            this.signup(response, 'google');
        }
        return (
            <div className="user_authorization">
                <GoogleLogin
                    clientId="758979408479-h8rgnvkfhro2o2i3q3idek10r5cbt4u3.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}/>
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