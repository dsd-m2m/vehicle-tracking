import React from 'react';
import Header from '../_components/Header';


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
			<div className="HomePage">
				<Header/>
			</div>

			);
	}
}

export default HomePage;
