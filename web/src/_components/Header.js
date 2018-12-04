import React from 'react';
import { Link,withRouter } from 'react-router';
import { GoogleLogout } from 'react-google-login';
 
class Header extends React.Component {
  constructor(props){
    super(props);
  }
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
