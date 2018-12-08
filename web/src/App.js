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
import ContactPage from './ContactPage';
import AboutPage from './AboutPage';

import './_designs/login.css';
import './_designs/home.css';
import './_designs/design.css';

class App extends React.Component {
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
								<Route path="/login" component={LoginPage} />
								<PrivateRoute exact path="/" component={HomePage} />
								<PrivateRoute path="/vehicles" exact component={VehiclesPage} />
								<PrivateRoute path="/users" exact component={UsersPage} />
								<Route path="/contact" exact component={ContactPage}/>
								<Route path="/about" exact component={AboutPage}/>
							</Switch>
						</div>
					</Router>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({ alert: state.alert });

export default connect(mapStateToProps)(App);
