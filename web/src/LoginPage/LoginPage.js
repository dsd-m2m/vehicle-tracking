import React from 'react';
import { Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';

import { PostData } from '../_services';


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

        if (socialToken) {
            PostData('signup', socialToken).then((result) => {
                let responseJson = result;
                localStorage.setItem("userData", JSON.stringify(responseJson));
                this.setState({redirect: true});
        });
        } else {}
    }

    render() {
        if (this.state.redirect || localStorage.getItem('userData')) {
            return (<Redirect to={'/'}/>)
        }

        const responseGoogle = (response) => {
            console.log("google console");
            console.log(response);
            this.signup(response);
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