import React from 'react';
import { Link } from 'react-router-dom';
import logo from './../pictures/logo.png';

const logoStyle = {
	width: '80px',
	height: '40px',
	left: '0px',
	top: '0px'
}
/*renders a route component if the user is logged in,
otherwise it redirects the user to the /login page.*/
const SideBar = () => (
	<>
		{/* <div className="sidenav"> */}
		<nav className="navbar navbar-default fixed-top navbar-expand-sm bg-dark navbar-dark">
			<Link className="navbar-brand" to="/">
				<img src={logo} alt="M2M" style={logoStyle}></img>
			</Link>
  			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
    			<span className="navbar-toggler-icon"></span>
  			</button>
  			<div className="collapse navbar-collapse" id="collapsibleNavbar">
    			<ul className="navbar-nav">
      				<li className="nav-item">
					  	<Link className="nav-link" to="/about">About</Link>
      				</li>
      				<li className="nav-item">
					  	<Link className="nav-link" to="/contact">Contact</Link>
      				</li>
					<li className="nav-item">
					  	<Link className="nav-link" to="/vehicles">Vehicles</Link>
      				</li>
					<li className="nav-item">
					  <Link className="nav-link" to="/users">Users</Link>
      				</li>   
    			</ul>
  			</div>  
		</nav>
			{/* <Link to="/">Home</Link>
			<Link to="/about">About</Link>
		    <Link to="/contact">Contact</Link>
			<Link to="/vehicles">Vehicles</Link>
			<Link to="/users">Users</Link> */}
		{/*</div> */}
	</>
);

export default SideBar;
