import React from 'react';
import { Redirect,Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { GoogleLogout } from 'react-google-login';

import '../_designs/home.css';
import '../_designs/design.css';
import { userActions } from '../_actions';
import { GetData } from '../_services';

class VehiclesPage extends React.Component {

    constructor(props){
        super(props);
        this.state={
        	name:'',
            redirect:false,
            listUsers:false,
        };
        this.signout = this.signout.bind(this);
    }

    componentDidMount() {
        let data = JSON.parse(localStorage.getItem('userData'));
        this.setState({name: data.name})
    }

    

    signout(){
        localStorage.removeItem('userData');
        localStorage.removeItem('jwt');
        this.setState({redirect: true});
        return (<Redirect to={'/login'}/>); 
    }
    render(){
    	if(userActions.isTokenExpired()){
        	this.setState({redirect: true});
    	}
    	const logout = (response) => {
            console.log("logging out!");
            this.signout();
        }
        
        if(!localStorage.getItem('userData') || this.state.redirect){
            return (<Redirect to={'/login'}/>)
        }else if(this.state.listUsers){
            return (<Redirect to={'/users'}/>)
        }

        const getUsers =()=>{
        	let jwt= JSON.parse(localStorage.getItem('jwt'));
        	GetData('user',jwt).then((result) => {
                let responseJson = result;
                console.log(responseJson);
                localStorage.setItem("users_list",JSON.stringify(responseJson));
                this.setState({listUsers:true});
            }).catch(e => {
                console.log(e);
            });           
        }

        return (
            <div className="Hpage">
                <div className="welcoming">
                    Welcome {this.state.name}
                </div>
                <div className="sidenav">
                	<Link to="/">Home</Link>
                	<a href="https://www.fer.unizg.hr/rasip/dsd/projects/m2m">About</a>
                    <a href="mailto:tomislav.skokovic@fer.hr">Contact</a>
                    <Link to="/vehicles">Vehicles</Link>
                    <span onClick={getUsers}>Users</span>
                </div>

                <div className="user_authorization">
                    <GoogleLogout
                    buttonText="Logout"
                    onLogoutSuccess={logout}
                    >
                    </GoogleLogout>
                </div>
            </div>
            
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedVehiclesPage = connect(mapStateToProps)(VehiclesPage);
export { connectedVehiclesPage as VehiclesPage };