import React from 'react';

import api from '../api';
import Header from '../_components/Header';

//component on route /vehicles,it renders list of vehicles stored in database
class VehiclesPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {                                                     
			vehicles: [],
		};
		this.getSensors=this.getSensors.bind(this);
	}


	componentDidMount() {
		this.getVehicles();
	}

	//when this route is accessed it fetches all vehicles from server
	getVehicles = () => {
		api('GET', 'vehicle')
			.then(res => this.setState({ vehicles: res.data }))
			.catch(e => {
				console.log(e);
			});
	};

	getSensors =(vin)=>{
			console.log(vin);
			this.props.history.push('/sensors');
	}


	render() {
		console.log(this.state.vehicles);
		return (
			<div>
			 	<Header/>
				<div className="list">
					<h2>Vehicles</h2>
					{this.state.vehicles.map((vehicle,index) =>{
						return (
							<ol key={vehicle.vin}>
								{index+1}.VehicleID:{vehicle.vin}<br/>
								Model:{vehicle.model}<br/>
								Proizvodac:{vehicle.manufacturer}<br/>
								Godina proizvodnje:{vehicle.manufactureYear}<br/>
								<button onClick={()=>this.getSensors(vehicle.vin)}>Get sensor data</button>
								<br />
							</ol>
						);
					})}
				</div>
			</div>
		);
	}
}

export default VehiclesPage;