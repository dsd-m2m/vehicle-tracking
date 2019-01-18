import React from 'react';
import Collapse from 'react-collapse';

import api from '../api';
import addCircle from '../pictures/add-circle.svg';
import graphic from '../pictures/graphic-eq.svg'
import removeCircle from '../pictures/remove-circle.svg'

const h2style = {
	color: '#2D9CDB',
	fontFamily: 'Roboto',
	fontWeight: 'bold',
	fontSize: '48px',
	marginLeft: '5%',
	marginTop: '3%'
}

const addButtonStyle = {
	marginLeft: '90%'
}

const addForm = {
	marginLeft: '35%'
}

const textAreaStyle = {
	width: '350px'
}

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


	//function that redirects to component for visualisation of sensor readings
	getSensors =(vin)=>{
			console.log(vin);
			this.props.history.push('/sensors');
	};


	//function for adding new vehicle in database
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


	//toggles view of form for adding new vehicle on/off
	setFormVisibility=()=>{
		this.setState({showForm:!this.state.showForm});
	};


	//function that handles input type=text and saves new vehicle information in current state
	handleInput=(name,e)=>{
		var newState = {...this.state.newVehicle}
		newState[name]=e.target.value;
		this.setState({newVehicle:newState})
		//console.log(newState);
	};


	//deletes vehicle from database
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
			 	
				<div className="usersPage">
					<h2 style={h2style} >Vehicles</h2>
					<button onClick={()=>this.setFormVisibility()} style={addButtonStyle} className="vehiclePageButtons">
						<img src={addCircle} alt="Add Vehicle"/>
					</button><br/>
					<Collapse isOpened={this.state.showForm}>
						<div className="tileUsers">
							<br/><br/>
							<form style={addForm}>
								<label>Vehicle ID number</label><br/>
								<input type="text" style={textAreaStyle} onChange={(e) => this.handleInput("vin",e)}></input><br/>
								<label>Model</label><br/>
								<input type="text" style={textAreaStyle} onChange={(e) => this.handleInput("model",e)}></input><br/>
								<label>Manufacturer</label><br/>
								<input type="text" style={textAreaStyle} onChange={(e) => this.handleInput("manufacturer",e)}></input><br/>
								<label>Manufacturer Year</label><br/>
								<input type="text" style={textAreaStyle} onChange={(e) => this.handleInput("manufactureYear",e)}></input><br/>
								<button onClick={()=>this.addNewVehicle()} className="vehiclePageButtons">Submit</button>
							</form>
						</div>
					</Collapse>

					{this.state.vehicles.map((vehicle,index) =>{
						return (
							// <ol className="vehiclesList" key={vehicle.vin}>
							// 	{index+1}.VehicleID:{vehicle.vin}<br/>
							// 	Model:{vehicle.model}<br/>
							// 	Manufacturer:{vehicle.manufacturer}<br/>
							// 	Manufacture Year:{vehicle.manufactureYear}<br/>
							// 	<button onClick={()=>this.getSensors(vehicle.vin)} className="vehiclePageButtons">Get sensor data</button>
							// 	<button onClick={()=>this.deleteVehicle(vehicle.vin)} className="vehiclePageButtons">Delete vehicle</button>
							// 	<br />
							// </ol>


							<div className="tileUsers">
								<ol key={vehicle.vin}>
									{/*ID:{user.id}
									<br /> <br/>
									username:{user.username}
									<br /> <br/>
									email:"{user.email}"
									<br /> <br/>
									role:{user.roleId === 1 ? 'Vehicle owner' : 'OEM user'} */}
								{/* </ol>
								*/}
									<div className="tile-left">
										<b>ID</b> <br/><br/>
										<b>Model</b> <br/><br/>
										<b>Manufacturer</b> <br/><br/>
										<b>ManufactureYear</b> <br/><br/> <br/>
										{/* <button onClick={()=>this.getSensors(vehicle.vin)} className="vehiclePageButtons">Get sensor data</button> */}
									</div>
									<div className="tile-right">
										{/* <button onClick={()=>this.getSensors(vehicle.vin)} className="vehiclePageButtons">Get sensor data</button> */}
										<br/><br/>
										{vehicle.vin} 
										<br /> <br/>
										{vehicle.model}
										<br /> <br/>
										{vehicle.manufacturer}
										<br /> <br/>
										{vehicle.manufactureYear} 

										<br/> <br/>
										{/* <button onClick={()=>this.deleteVehicle(vehicle.vin)} className="vehiclePageButtons">Delete vehicle</button> */}
									</div>
									<div className="">
										<button onClick={()=>this.getSensors(vehicle.vin)} className="vehiclePageButtons">
											<img src={graphic} alt="Get sensor data"/>
										</button>
										<button onClick={()=>this.deleteVehicle(vehicle.vin)} className="vehiclePageButtons">
											<img src={removeCircle} alt="Delete vehicle"/>
										</button>
										<br />
									</div>
									
								</ol>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

export default VehiclesPage;