import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';
import { userConstants } from '../_constants';
 
import '../_designs';


class HomePage extends React.Component {

    constructor(props){
        super(props);
        this.state={
            name:'',
            redirect:false,
        };

        this.signout = this.signout.bind(this);
        
    }

    componentDidMount() {
        let data = JSON.parse(localStorage.getItem('userData'));
        console.log(data);
        this.setState({name: data.userData.name})
    }

    if(isTokenExpired){
        this.state.redirect.setState(true);
    }


    signout(){
        localStorage.removeItem('userData');
        localStorage.removeItem('jwtToken');
        return { type: userConstants.LOGOUT };
    }

    render() {

        const logout = (response) => {
            console.log("logging out!");
            this.signout();
        }
        
        if(!localStorage.getItem('userData') || this.state.redirect){
            return (<Redirect to={'/login'}/>)
        }

        return (
            <div >
                Welcome {this.state.name}
                <GoogleLogout
                buttonText="Logout"
                onLogoutSuccess={logout}
                >
                </GoogleLogout>
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

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage }