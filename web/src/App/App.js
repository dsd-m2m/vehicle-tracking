import React from 'react';
import { Router, Route ,Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { VehiclesPage } from '../VehiclesPage';
import { UsersPage } from '../UsersPage';
 

class App extends React.Component {
    constructor(props) {
        super(props);
        localStorage.clear();
        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }
    
    render() {
        const { alert } = this.props;
        return (
            <div className="jumbotron">
                <div className="container">
                    {alert.message &&
                        <div className={`alert ${alert.type}`}>{alert.message}</div>
                    }
                    <Router history={history}>
                        <Switch>
                            <PrivateRoute exact path="/" component={ HomePage } />
                            <Route path="/login" component={ LoginPage } />
                            <PrivateRoute path="/vehicles"  exact component={ VehiclesPage } />
                            <PrivateRoute path="/users"  exact component={ UsersPage } />
                        </Switch>
                    </Router>
                </div>
            </div> 
            
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 