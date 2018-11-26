import React from 'react';
import { Link } from 'react-router-dom';

/*renders a route component if the user is logged in,
otherwise it redirects the user to the /login page.*/
const SideBar = ({ name }) => (
	<>
		{name && <div className="welcoming">Welcome {name}</div>}
		<div className="sidenav">
			<Link to="/">Home</Link>
			<a href="https://www.fer.unizg.hr/rasip/dsd/projects/m2m">About</a>
			<a href="mailto:tomislav.skokovic@fer.hr">Contact</a>
			<Link to="/vehicles">Vehicles</Link>
			<Link to="/users">Users</Link>
		</div>
	</>
);

export default SideBar;
