import React from 'react';


const blueSpan = {
	color: '#2D9CDB'
}


class HomePage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	componentDidMount() {
	}


	render() {
		return(
			// <div className="HomePage">
			<div className="" >
				<div className="homepage">
					<div className="firstCandy">
						Number of cars <br/><br/>
						<span style={blueSpan}>1337</span>
					</div>
					<div className="secondCandy">
						Connected cars <br/><br/>
						<span style={blueSpan}>800</span>
					</div>
					<div className="thirdCandy">
						Fastest vehicle <br/><br/>
						<span style={blueSpan}>ConceptTwo</span>
					</div>
					<div className="fourthCandy">
						Oldest vehicle <br/><br/>
						<span style={blueSpan}>ConceptOne</span>
					</div>
				</div>
			</div>

			);
	}
}

export default HomePage;
