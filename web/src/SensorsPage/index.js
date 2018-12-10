import React from 'react';
import moment from 'moment';
import Collapse from 'react-collapse';
import { VictoryChart, VictoryLine } from "victory";

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
			render:false,
			showGraph:false,
			graphData:[]
		};
	}



	componentDidMount() {
		this.getSensors("1T7HT4B27X1183680");
	}



//1T7HT4B27X1183680
	getSensors = (vin) =>{
		api('GET','sensorData/'+vin)
		.then(res=>{
			this.setState({sensors:res.data});
			//console.log(res.data[0]);
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


	
	showGraph = type => { 
		var graphData=[];
		var i,sensor;

		switch(type){
			case "Motor Rounds per minute":
					for(i in this.state.sensors){
						sensor = {
							data:this.state.sensors[i].MotorRpm,
							time:moment.utc(this.state.sensors[i].timestamp).format('MMMM Do YYYY, h:mm:ss a')		
						}
						graphData.push(sensor);
					}
					console.log(graphData);
					break;

			case "Car speed":
					for(i in this.state.sensors){
						sensor = {
							data:this.state.sensors[i].carSpeed,
							time:moment.utc(this.state.sensors[i].timestamp).format('MMMM Do YYYY, h:mm:ss a')
						}
						graphData.push(sensor);
					}
					console.log(graphData);
					break;

			case "Motor power":
					for(i in this.state.sensors){
						sensor = {
							data:this.state.sensors[i].powerMotorTotal,
							time:moment.utc(this.state.sensors[i].timestamp).format('MMMM Do YYYY, h:mm:ss a')		
						}
						graphData.push(sensor);
					}
					console.log(graphData);
					break;

			case "Oil motor temperature":
					for(i in this.state.sensors){
						sensor = {
							data:this.state.sensors[i].tempOilMotor,
							time:moment.utc(this.state.sensors[i].timestamp).format('MMMM Do YYYY, h:mm:ss a')
						}
						graphData.push(sensor);
					}
					console.log(graphData);
					break;

			case "Motor torque":
					for(i in this.state.sensors){
						sensor = {
							data:this.state.sensors[i].torqueMotor,
							time:moment.utc(this.state.sensors[i].timestamp).format('MMMM Do YYYY, h:mm:ss a')							 
						}
						graphData.push(sensor);
					}
					console.log(graphData);
					break;

			default: console.log("Error");
		}
		this.setState({ graphData:graphData });
		this.setState({ showGraph:true });
	}
	
	render() {
		if(!this.state.render)return null;
		return (
			<div id="SensorsPage">
			 	<Header/>
				<div className="list" >
					<h2>Sensor Data VIN:{this.state.vin}</h2>
					<button className="sensorsButtons" onClick={()=>this.showGraph("Motor Rounds per minute")}>Motor Rpm</button>
					<button className="sensorsButtons" onClick={()=>this.showGraph("Car speed")}>Speed</button>
					<button className="sensorsButtons" onClick={()=>this.showGraph("Motor power")}>Motor Power</button>
					<button className="sensorsButtons" onClick={()=>this.showGraph("Oil motor temperature")}>Motor Oil</button>
					<button className="sensorsButtons" onClick={()=>this.showGraph("Motor torque")}>Motor Torque</button>

					{this.state.showGraph &&
						<VictoryChart width={800} height={400}>
							  <VictoryLine style={{   data: { stroke: "#c43a31" },
												      parent: { border: "1px solid #ccc"}
												    }}
							    data={this.state.graphData}
							    x="time"
        						y="data"
							  />
							</VictoryChart>
					}
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



