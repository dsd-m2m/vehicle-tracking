import React from 'react';
import { withRouter } from 'react-router';
import { GoogleLogout } from 'react-google-login';


//renders a header component that contain welcoming message and loguout button 
class Header extends React.Component {
  //after logout button is clicked this function is called,it 
  //removes jwt and user data from local storage and redirects user to 
  //login page
  signout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('jwt');
    this.props.history.push('/login');
    console.log('signed out');
  };

  render() {
      const name = localStorage.getItem('userData');
      return (
        <div>
          {name && <div className="welcoming">Welcome {name}</div>}
          <div className="user_authorization">
            {name && (
                <div>
                  <GoogleLogout buttonText="Logout" onLogoutSuccess={this.signout}></GoogleLogout>
                </div>
              )}
          </div>
        </div>
      );
  }
}

export default withRouter(Header)
