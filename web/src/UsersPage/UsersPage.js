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
        };
        this.signout = this.signout.bind(this);
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


    render(){
        if(userActions.isTokenExpired()){
            this.setState({redirect: true});
        }

        if(!localStorage.getItem('userData') || this.state.redirect){
            return (<Redirect to={'/login'}/>)
        }
    	const logout = (response) => {
            console.log("logging out!");
            this.signout();
        }
        
        const getUsers =()=>{
        	let jwt= JSON.parse(localStorage.getItem('jwt'));
        	//console.log(jwt);
        	GetData('user',jwt).then((result) => {
                let responseJson = result;
                console.log(responseJson);
                localStorage.setItem("users_list",JSON.stringify(responseJson));
                this.setState({users:JSON.parse(localStorage.getItem('users_list'))});
            }).catch(e => {
                console.log(e);
            }); 
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
                                            {index+1}.UserID:{user.id}<br/>Username:{user.username}<br/>Email:"{user.email}"<br/>Role:{user.id===1?'Vehicle owner':'OEM user'}
                                            </ol>
                                    )

                            })}
                </div>
                <div className="sidenav">
                	<Link to="/">Home</Link>
                	<a href="https://www.fer.unizg.hr/rasip/dsd/projects/m2m">About</a>
                    <a href="mailto:tomislav.skokovic@fer.hr">Contact</a>
                    <Link to="/vehicles">Vehicles</Link>
                    <Link to="/users" onClick={getUsers}>Users</Link>
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
    const { users } = state;
    return {
        users
    };
}

const connectedUsersPage = connect(mapStateToProps)(UsersPage);
export { connectedUsersPage as UsersPage };
