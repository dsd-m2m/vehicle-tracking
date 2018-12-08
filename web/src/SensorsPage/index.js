import React from 'react';
import moment from 'moment';
import Collapse from 'react-collapse';

import api from '../api';
import Header from '../_components/Header';
//import VehicleMap from "../_components/VehicleMap"



/*<div className="map">
										<VehicleMap 
											location={{lat: sensor.latitude, lng: sensor.longitude}}
											googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDvoDfjH3RFwKvHVIAV2mBr5ZyXeSuWmTw&v=3.exp&libraries=geometry,drawing,places`}
											loadingElement={<div style={{ height: `100%` }} />}
											containerElement={<div style={{ height: `500px`, width: `500px` }} />}
											mapElement={<div style={{ height: `100%` }} />}
										/>
										</div>*/


//component on route /vehicles,it renders list of vehicles stored in database
class SensorsPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			vin:'',
			sensors: [],
			isOpened: [],
			render:false
		};
		this.handleClick=this.handleClick.bind(this);
	}

	componentDidMount() {
		this.getSensors("1T7HT4B27X1183680");
	}


//1T7HT4B27X1183680
	getSensors = (vin) =>{
		api('GET','sensorData/'+vin)
		.then(res=>{
			this.setState({sensors:res.data});
			console.log(res.data[0]);
			for(var i=0;i<this.state.sensors.length;i++){
				this.state.isOpened.push(false);
			}
			this.setState({render:true})
			//console.log(this.state.isOpened);
		})
		.catch(e => {
				console.log(e);
			});
	};

	handleClick = i =>{
		this.setState(state => {
	     	const isOpened = state.isOpened.map((item, j) => {
	        	if (j === i) {
	          		return item?false:true;
	        	} else {
	          		return item;
	        	}
	      	});

	      	return {
	        	isOpened,
	      	};
	    });
	};
	
	showGraph=type=>{
		switch(type){
			case "MotorRpm":
					console.log(type);
					break
			case "carSpeed":
					console.log(type);
					break;
			case "powerMotorTotal":
					console.log(type);
					break;
			case "tempOilMotor":
					console.log(type);
					break;
			case "torqueMotor":
					console.log(type);
					break;
			default: console.log("Error");
		}
	}
	
	render() {
		if(!this.state.render)return null;
		return (
			<div>
			 	<Header/>
				<div className="list">
					<h2>Sensor Data VIN:{this.state.vin}</h2>
					<button onClick={()=>this.showGraph("MotorRpm")}>MotorRpm</button>
					<button onClick={()=>this.showGraph("carSpeed")}>Speed</button>
					<button onClick={()=>this.showGraph("powerMotorTotal")}>MotorPower</button>
					<button onClick={()=>this.showGraph("tempOilMotor")}>Motoroil</button>
					<button onClick={()=>this.showGraph("torqueMotor")}>MotorTorque</button>
					{this.state.sensors.map((sensor,index)=>{
						let date=moment.utc(sensor.timestamp).toString();
						return(
							<div key={index}>
								<ol onClick={()=>this.handleClick(index)}> {index+1}.{date} </ol><br/>
								<Collapse isOpened={this.state.isOpened[index]}>
									<div className="textData">
										Motor Rounds per Minute:{sensor.MotorRpm}<br/> 
										Car Speed:{sensor.carSpeed}<br/>
										Total motor power:{sensor.powerMotorTotal}<br/> 
										Motor Oil temperature:{sensor.tempOilMotor}<br/>
										Motor torque:{sensor.torqueMotor}<br/>
									</div>
								</Collapse>
							</div>						
						);
					})}
				</div>
			</div>
		);
	}
}

export default SensorsPage;



