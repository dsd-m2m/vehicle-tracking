import React from 'react';

import '../_designs/home.css';
import '../_designs/design.css';
import api from '../api';

class VehiclesPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			listUsers: false,
		};
	}

	render() {
		return <div className="vehicles">Vehicles</div>;
	}
}

export default VehiclesPage;
