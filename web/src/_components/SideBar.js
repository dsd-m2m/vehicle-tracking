import React from 'react';
import { Link } from 'react-router-dom';

/*renders a route component if the user is logged in,
otherwise it redirects the user to the /login page.*/
const SideBar = () => (
	<>
		<div className="sidenav">
			<Link to="/">Home</Link>
			<Link to="/about">About</Link>
		    <Link to="/contact">Contact</Link>
			<Link to="/vehicles">Vehicles</Link>
			<Link to="/users">Users</Link>
		</div>
	</>
);

export default SideBar;
