import React from 'react';
import { Redirect,Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { GoogleLogout } from 'react-google-login';

import '../_designs/home.css';
import '../_designs/design.css';
import { userActions } from '../_actions';
import { GetData } from '../_services';


class UsersPage extends React.Component {

    constructor(props){
        super(props);
        this.state={
        	name:'',
            users:[],
            redirect:false,
            listVehicles:false,
        };
        this.signout = this.signout.bind(this);
        this.getUsers = this.getUsers.bind(this);
        this.getVehicles = this.getVehicles.bind(this);
        
    }

    componentDidMount() {
        let data = JSON.parse(localStorage.getItem('userData'));
        let users_list=JSON.parse(localStorage.getItem('users_list'));
        this.setState({name: data.name});
        this.setState({users: users_list});
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
        if(!localStorage.getItem('userData') || this.state.redirect ||userActions.isTokenExpired()){
            return (<Redirect to={'/login'}/>)
        }else if(this.state.listVehicles){
            return (<Redirect to={'/vehicles'}/>)
        }
        return (
            <div className="Hpage">
                <div className="welcoming">
                    Welcome {this.state.name}
                </div>
                <div className="UsersList">
                    <h2>Users</h2>
                            {this.state.users.map(function(user,index){
                                    return( <ol key={index}>
                                            {index+1}.UserID:{user.id}<br/>
                                            Username:{user.username}<br/>
                                            Email:"{user.email}"<br/>
                                            Role:{user.roleId===1?'Vehicle owner':'OEM user'}
                                            </ol>
                                    )

                            })}
                </div>
                <div className="sidenav">
                	<Link to="/">Home</Link>
                	<a href="https://www.fer.unizg.hr/rasip/dsd/projects/m2m">About</a>
                    <a href="mailto:tomislav.skokovic@fer.hr">Contact</a>
                    <span onClick={this.getVehicles}>Vehicles</span>
                    <Link to="/users" onClick={this.getUsers}>Users</Link>
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
    const { users } = state;
    return {
        users
    };
}

const connectedUsersPage = connect(mapStateToProps)(UsersPage);
export { connectedUsersPage as UsersPage };
