import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';

import ferLogo from '../_pictures/fer.jpg';
import polimiLogo from '../_pictures/polimi.png';

class App extends React.Component {
	constructor(props) {
		super(props);

		const { dispatch } = this.props;
		history.listen((location, action) => {
			// clear alert on location change
			dispatch(alertActions.clear());
		});
	}

	render() {
		const { alert } = this.props;
		return (
			<>
				<div id="header">
					<h1>Vehicle tracking</h1>
				</div>
				{/* @Frano you can create a nav component here */}
				<div class="sidenav">
					<a href="/about">About</a>
					<a href="/services">Services</a>
					<a href="/clients">Clients</a>
					<a href="/contact">Contact</a>
				</div>
				<div className="jumbotron">
					<div className="container">
						<div className="col-sm-8 col-sm-offset-2">
							{alert.message && (
								<div className={`alert ${alert.type}`}>{alert.message}</div>
							)}
							<Router history={history}>
								<div>
									<PrivateRoute exact path="/" component={HomePage} />
									<Route path="/login" component={LoginPage} />
								</div>
							</Router>
						</div>
					</div>
				</div>
				<div id="footer">
					<img src={ferLogo} alt="" id="fer_logo" class="logo" />
					<img src={polimiLogo} alt="" id="polimi_logo" class="logo" />©
					FER,POLIMI,M2M-Vehicle tracking 2018
				</div>
			</>
		);
	}
}

function mapStateToProps(state) {
	const { alert } = state;
	return {
		alert,
	};
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
