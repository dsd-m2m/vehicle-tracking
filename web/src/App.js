import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { GoogleLogout } from 'react-google-login';

import PrivateRoute from './_components/PrivateRoute';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import VehiclesPage from './VehiclesPage';
import UsersPage from './UsersPage';
import SideBar from './_components/SideBar';

import './_designs/login.css';
import './_designs/home.css';
import './_designs/design.css';

class App extends React.Component {
	signout = () => {
		localStorage.removeItem('userData');
		localStorage.removeItem('jwt');
		this.props.history.push('/login');
		console.log('signed out');
	};

	render() {
		const { alert } = this.props;
		const name = localStorage.getItem('userData');
		console.log(name);
		return (
			<div className="jumbotron">
				<div className="container">
					{alert.message && <div className={`alert ${alert.type}`}>{alert.message}</div>}
					<Router history={this.props.history}>
						<div className="Hpage">
							<SideBar name={name}/>

							<Switch>
								<PrivateRoute exact path="/" component={HomePage} />
								<Route path="/login" component={LoginPage} />
								<PrivateRoute path="/vehicles" exact component={VehiclesPage} />
								<PrivateRoute path="/users" exact component={UsersPage} />
							</Switch>
						</div>
					</Router>

					{name && (
						<div className="user_authorization">
							<GoogleLogout buttonText="Logout" onLogoutSuccess={this.signout}></GoogleLogout>
						</div>
					)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({ alert: state.alert });

export default connect(mapStateToProps)(App);
