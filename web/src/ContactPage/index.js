import React from 'react';
import api from '../api';

class ContactPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	componentDidMount() {
	}


	render() {
		return (
			<div class="contact">
				<h1>Contact Us</h1>
				<p>
							Some Text about our company should be written here
				</p>



			<div class="form">
				<form>
					<input type="text" placeholder="Name"></input>
					<input type="text" placeholder="E-Mail"></input>
					<input type="text" id="msg" placeholder="Message"></input>

				</form>

				<button type="button">Let's Talk</button>
			</div>
		</div>
			);
	}
}

export default ContactPage;
