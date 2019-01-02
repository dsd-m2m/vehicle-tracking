import React from 'react';
import moment from 'moment';
import Collapse from 'react-collapse';
import { VictoryChart, VictoryLine } from "victory";

import api from '../api';
import Header from '../_components/Header';


class SensorsPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			vin:'',
			sensors: [],
			isOpened: [],
			render:false,
			showGraph:false,
			graphData:[],
			checkboxSensor:[],
			start:false,
			end:false,
			selectAll:true
		};
	}

	
	componentDidMount() {
		this.getSensors("1T7HT4B27X1183680");
		this.setState({vin:"1T7HT4B27X1183680"});
	}


//fetches sensors readings for selected car(VIN)
	getSensors = (vin) =>{
		api('GET','sensorData/'+vin)
		.then(res=>{
			this.setState({sensors:res.data});
			//console.log(res.data[0]);
			for(var i=0;i<this.state.sensors.length;i++){
				this.state.isOpened.push(false);
				this.state.checkboxSensor.push(false);
			}
			this.setState({render:true})
			//console.log(this.state.isOpened);
		})
		.catch(e => {
				console.log(e);
			});
	};


//handles click on specific sensor reading and toggles viewing on/off
	handleClick = i =>{
		const Open=Array.from(this.state.isOpened);
		Open[i]=Open[i]?false:true;
		this.setState({isOpened:Open});
	};
//handles checkbox for selecting which sensor data will be shown on graph or exported to csv
	handleCheckbox= i =>{
		const checkbox=Array.from(this.state.checkboxSensor);
		checkbox[i]=checkbox[i]?false:true;
		this.setState({checkboxSensor:checkbox});
	};
//handles selected start and end timeframe
	handleTimestamp=(name,i)=>{
		if(this.state[name]===i){
			this.setState({[name]:false});
		}else{
			this.setState({[name]:i});
		}
	};


//called when user wants to visualise specific sensor data with graph	
	showGraph = sensorName => { 
		var graphData=[];
		var i,sensor;
		var start=this.state.start===false?0:this.state.start;
		var end=this.state.end===false?this.state.sensors.length:this.state.end;

		for(i in this.state.sensors){
			if(this.state.checkboxSensor[i] || ( i>=start && i<=end && (this.state.start!==false || this.state.end!==false ) ) ){
				sensor = {
					data:this.state.sensors[i][sensorName],
					time:moment.utc(this.state.sensors[i].timestamp).format('MMMM Do YYYY, h:mm:ss a')		
				}

				graphData.push(sensor);
			}
		}
		graphData=graphData.filter((item)=>!!item.data);

		console.log(graphData);

		this.setState({ graphData:graphData });
		this.setState({ showGraph:true });
	};

//exports sensors readings in specified timeframe as .csv file,if start and end timestamp arent selected it automatically exports all readings
	exportcsv=()=>{
		var start=this.state.start===false?this.state.sensors[0].timestamp:this.state.sensors[this.state.start].timestamp;
		var end=this.state.end===false?this.state.sensors[this.state.sensors.length-1].timestamp:this.state.sensors[this.state.end].timestamp;
		const FileDownload = require('js-file-download');
		api('GET','sensorData/'+this.state.vin+'/export?start='+start+'&end='+end)
		.then((response) =>{ 
			FileDownload(response.data, "report.csv");
		})
		.catch(e => {
				console.log(e);
			});

	};

	//function that toggles select all checkbox ON/OFF
	toggleSelectAll=()=>{
		var toggleCheckAll=[];
		for(var i=0;i<this.state.checkboxSensor.length;i++){
				toggleCheckAll.push(this.state.selectAll?true:false);
			}
		var newSelectAll=this.state.selectAll?false:true
		this.setState({selectAll:newSelectAll});
		this.setState({checkboxSensor:toggleCheckAll});
	};	

	render() {
		if(!this.state.render)return null;
		return (
			<div id="SensorsPage">
			 	<Header/>
				<div className="list" >
					<h2>Sensor Data VIN:{this.state.vin}</h2>
					<button className="sensorsButtons" onClick={()=>this.showGraph("MotorRpm")}>Motor Rpm</button>
					<button className="sensorsButtons" onClick={()=>this.showGraph("carSpeed")}>Speed</button>
					<button className="sensorsButtons" onClick={()=>this.showGraph("powerMotorTotal")}>Motor Power</button>
					<button className="sensorsButtons" onClick={()=>this.showGraph("tempOilMotor")}>Motor Oil</button>
					<button className="sensorsButtons" onClick={()=>this.showGraph("torqueMotor")}>Motor Torque</button>
					<button className="sensorsButtons" onClick={()=>this.exportcsv()}>Export CSV</button>
					<br/>

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
					<label className="SelectAllCheckbox"><input type="checkbox" onChange={() => this.toggleSelectAll()}/>Select All</label>
					{this.state.sensors.map((sensor,index)=>{
						let date=moment.utc(sensor.timestamp).toString();
						return(
							<div key={index}>
								<ol> 
								<span className="sensorsList" onClick={()=>this.handleClick(index)}>{index+1}.{date}</span>
								<div className="listCheckboxes">
								<input type="checkbox" onChange={() => this.handleCheckbox(index)} className="sensorsCheckbox" checked={this.state.checkboxSensor[index]}/>Select
								<input type="checkbox" onChange={() => this.handleTimestamp("start",index)}  checked={this.state.start===index}/>Start
								<input type="checkbox" onChange={() => this.handleTimestamp("end",index)}  checked={this.state.end===index}/>End
								</div>
								</ol>
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



