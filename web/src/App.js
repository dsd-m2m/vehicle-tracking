import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PrivateRoute from './_components/PrivateRoute';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import VehiclesPage from './VehiclesPage';
import SensorsPage from './SensorsPage';
import UsersPage from './UsersPage';
import SideBar from './_components/SideBar';
import ContactPage from './ContactPage';
import AboutPage from './AboutPage';
import ErrorPage from './ErrorPage'
import Header from './_components/Header';

import './_designs/home.css';
import './_designs/design.css';
import './_designs/contactpage.css'
import './_designs/aboutpage.css'

class App extends React.Component {
	render() {
		return (
			<div id="root-div">
					<Router history={this.props.history}>
						<div className="Hpage">
							<Header/>
							<SideBar/>

							<Switch>
								<Route path="/login" component={LoginPage} />
								<PrivateRoute exact path="/" component={HomePage} />
								<PrivateRoute path="/vehicles" component={VehiclesPage} />
								<PrivateRoute path="/sensors" component={SensorsPage}/>
								<PrivateRoute path="/users" component={UsersPage} />
								<Route path="/contact" exact component={ContactPage}/>
								<Route path="/about" exact component={AboutPage}/>
								<Route component={ErrorPage}/>
							</Switch>
						</div>
					</Router>
			</div>
		);
	}
}



export default App;
