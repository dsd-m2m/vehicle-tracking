import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { Link } from 'react-router-dom';

import api from '../api';

class LoginPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loginError: false,
		};
	}

	signup = res => {
		const social_token = res.tokenId;
		console.log(res);
		if (social_token) {
			api('POST', 'auth/login', { social_token })
				.then(({ data }) => {
					console.log(data);
					localStorage.setItem('userData', res.w3.ig);
					localStorage.setItem('jwt', data.token);
					this.props.history.push('/');
					console.log(localStorage.getItem('userData'));
				})
				.catch(e => {
					this.setState({ loginError: true });
					console.log(e);
				});
		} else {
		}
	};

	render() {
		if (this.state.loginError) {
			return (
				<div className="srvDown">
					<img src="pictures/srvDown.jpg" alt="Server Is Down" />
				</div>
			);
		}

		return (
			<div className="Lpage">
				<div className="sidenav">
					<Link to="/about">About</Link>
					<Link to="/contact">Contact</Link>
				</div>
				<div className="user_authorization">
					<GoogleLogin
						clientId="758979408479-h8rgnvkfhro2o2i3q3idek10r5cbt4u3.apps.googleusercontent.com"
						buttonText="Login with Google"
						onSuccess={this.signup}
						onFailure={this.signup}
					/>
				</div>
			</div>
		);
	}
}

export default LoginPage;
