import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';


import PrivateRoute from './_components/PrivateRoute';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import VehiclesPage from './VehiclesPage';
import SensorsPage from './SensorsPage';
import UsersPage from './UsersPage';
import SideBar from './_components/SideBar';
import ContactPage from './ContactPage';
import AboutPage from './AboutPage';

import './_designs/home.css';
import './_designs/design.css';
import './_designs/contactpage.css'
import './_designs/aboutpage.css'

class App extends React.Component {
	render() {
		const { alert } = this.props;
		return (
			<div id="root-div">
					{alert.message && <div className={`alert ${alert.type}`}>{alert.message}</div>}
					<Router history={this.props.history}>
						<div className="Hpage">
							<SideBar/>

							<Switch>
								<Route path="/login" component={LoginPage} />
								<PrivateRoute exact path="/" component={HomePage} />
								<PrivateRoute path="/vehicles" component={VehiclesPage} />
								<PrivateRoute path="/sensors" component={SensorsPage}/>
								<PrivateRoute path="/users" component={UsersPage} />
								<Route path="/contact" exact component={ContactPage}/>
								<Route path="/about" exact component={AboutPage}/>
							</Switch>
						</div>
					</Router>
			</div>
		);
	}
}

const mapStateToProps = state => ({ alert: state.alert });

export default connect(mapStateToProps)(App);
