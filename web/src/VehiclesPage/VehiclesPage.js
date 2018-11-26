import React from 'react';
import { Redirect,Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { GoogleLogout } from 'react-google-login';
//import moment from 'moment';

import '../_designs/home.css';
import '../_designs/design.css';
import { userActions } from '../_actions';
import { GetData } from '../_services';


class VehiclesPage extends React.Component {

    constructor(props){
        super(props);
        this.state={
        	name:'',
            vehicles:[],
            redirect:false,
            listUsers:false,
        };
        this.signout = this.signout.bind(this);
        this.getUsers = this.getUsers.bind(this);
        this.getVehicles = this.getVehicles.bind(this);
    }

    componentDidMount() {
        let data = JSON.parse(localStorage.getItem('userData'));
        let vehicles_list=JSON.parse(localStorage.getItem('vehicles_list'));
        this.setState({name: data.name});
        this.setState({vehicles:vehicles_list});
    }

    

    signout(){
        localStorage.removeItem('userData');
        localStorage.removeItem('jwt');
        this.setState({redirect: true});
        return (<Redirect to={'/login'}/>); 
    }

     getUsers(){
            GetData('user').then((result) => {
                let responseJson = result;
                console.log(responseJson);
                localStorage.setItem("users_list",JSON.stringify(responseJson));
                this.setState({listUsers:true});
            }).catch(e => {
                console.log(e);
            });           
    }

    getVehicles(){
            GetData('vehicle').then((result)=>{
                let responseJson = result;
                console.log(responseJson);
                localStorage.setItem("vehicles_list",JSON.stringify(responseJson));
                this.setState({listVehicles:true});
            }).catch(e => {
                console.log(e);
            });
}

    render(){        
        if(!localStorage.getItem('userData') || this.state.redirect||userActions.isTokenExpired()){
            return (<Redirect to={'/login'}/>)
        }else if(this.state.listUsers){
            return (<Redirect to={'/users'}/>)
        }

        return (
            <div className="Hpage">
                <div className="welcoming">
                    Welcome {this.state.name}
                </div>
                <div className="VehiclesList">
                    <h2>Vehicles</h2>
                            {this.state.vehicles.map(function(vehicle,index){
                                    return( <ol key={index}>
                                            {index+1}.VehicleID:{vehicle}<br/>
                                            </ol>
                                    )

                            })}
                </div>
                <div className="sidenav">
                	<Link to="/">Home</Link>
                	<a href="https://www.fer.unizg.hr/rasip/dsd/projects/m2m">About</a>
                    <a href="mailto:tomislav.skokovic@fer.hr">Contact</a>
                    <span onClick={this.getVehicles}>Vehicles</span>
                    <span onClick={this.getUsers}>Users</span>
                </div>

                <div className="user_authorization">
                    <GoogleLogout
                    buttonText="Logout"
                    onLogoutSuccess={this.signout}
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