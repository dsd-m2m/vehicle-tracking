import React from 'react';



const blueSpan = {
	color: '#2D9CDB'
}


class HomePage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			vehicles:[],
			oldest: {}
		};
	}

	componentDidMount() {
		this.countVehicles();
	}


	render() {
		return(
			// <div className="HomePage">
			<div className="" >
				<div className="homepage">
					<div className="firstCandy">
						Number of cars <br/><br/>
						<span style={blueSpan}>{this.state.vehicles.length}</span>
					</div>
					<div className="secondCandy">
						Connected cars <br/><br/>
						<span style={blueSpan}>-</span>
					</div>
					<div className="thirdCandy">
						Fastest vehicle <br/><br/>
						<span style={blueSpan}>-</span>
					</div>
					<div className="fourthCandy">
						Oldest vehicle <br/><br/>
						<span style={blueSpan}>{this.state.oldest.model}</span>
					</div>
				</div>
			</div>

			);
	}

	countVehicles = () => {
		api('GET', 'vehicle')
			.then(res => {
				this.setState({ vehicles: res.data })
				var vehicles = this.state.vehicles;
				var oldi = vehicles[0];
				for (var i = 1; i < vehicles.length; i++) {
					if (oldi.manufactureYear > vehicles[i].manufactureYear) {
						oldi = vehicles[i];
					} 
				}
				this.setState({ oldest: oldi })
			})
			.catch(e => {
				console.log(e);
			});
	};


}

export default HomePage;
