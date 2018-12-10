import React from 'react';
import Collapse from 'react-collapse';

import api from '../api';
import Header from '../_components/Header';

//component on route /vehicles,it renders list of vehicles stored in database
class VehiclesPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {                                                     
			vehicles: [],
			newVehicle:{
				vin:"",
				model:"",
				manufacturer:"",
				manufactureYear:0,
			},
			showForm:false
		};
		
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
	};

	addNewVehicle = () =>{
		console.log(this.state.newVehicle);
		api('POST','vehicle',this.state.newVehicle)
			.then(window.location.reload)
			.catch(e => {
				console.log(e);
			});
		var newState={
				vin:"",
				model:"",
				manufacturer:"",
				manufactureYear:0,
			};
		this.setState({newVehicle:newState});
		this.setState({showForm:false});
	};

	setFormVisibility=()=>{
		this.setState({showForm:!this.state.showForm});
	};

	handleInput=(name,e)=>{
		var newState = {...this.state.newVehicle}
		newState[name]=e.target.value;
		this.setState({newVehicle:newState})
		//console.log(newState);
	};

	deleteVehicle=(vin)=>{
		api('DELETE','vehicle/'+vin)
					.then(window.location.reload)
					.catch(e => {
						console.log(e);
					});
	}

	render() {
		return (
			<div>
			 	<Header/>
				<div className="list">
					<h2>Vehicles</h2>
					<button onClick={()=>this.setFormVisibility()} className="vehiclePageButtons">Add new Vehicle</button><br/>
					<Collapse isOpened={this.state.showForm}>
						<form>
							<label>Vehicle ID number</label><br/>
							<input  type="text" onChange={(e) => this.handleInput("vin",e)}></input><br/>
							<label>Model</label><br/>
							<input type="text" onChange={(e) => this.handleInput("model",e)}></input><br/>
							<label>Manufacturer</label><br/>
							<input type="text" onChange={(e) => this.handleInput("manufacturer",e)}></input><br/>
							<label>Manufacturer Year</label><br/>
							<input type="text" onChange={(e) => this.handleInput("manufactureYear",e)}></input><br/>
							<button onClick={()=>this.addNewVehicle()} className="vehiclePageButtons">Submit</button>
						</form>
					</Collapse>

					{this.state.vehicles.map((vehicle,index) =>{
						return (
							<ol key={vehicle.vin}>
								{index+1}.VehicleID:{vehicle.vin}<br/>
								Model:{vehicle.model}<br/>
								Manufacturer:{vehicle.manufacturer}<br/>
								Manufacture Year:{vehicle.manufactureYear}<br/>
								<button onClick={()=>this.getSensors(vehicle.vin)} className="vehiclePageButtons">Get sensor data</button>
								<button onClick={()=>this.deleteVehicle(vehicle.vin)} className="vehiclePageButtons">Delete vehicle</button>
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