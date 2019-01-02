import React from 'react';
import Header from '../_components/Header';

class ContactPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			contact:{
				userName:"",
				userMail:"",
				userMsg:""
			}
		};
	}

	componentDidMount() {
	}

	handleInput=(name,e)=>{
		var newState = {...this.state.contact}
		newState[name]=e.target.value;
		this.setState({contact:newState})
		//console.log(newState);
	};

	sendMail=()=>{
		console.log(this.state.contact);
	}

	render() {
		return (
			<div className="ContactPage">
				<Header/>
				<div className="contact">
					<h1>Contact Us</h1>
					<div className="form">
						<form>
							<input className="ContactPageInput" type="text" id="name" placeholder="Name" onChange={(e) => this.handleInput("userName",e)}></input>
							<input className="ContactPageInput" type="text" placeholder="E-Mail" onChange={(e) => this.handleInput("userMail",e)}></input>
							<textarea id="msg" cols="10" rows="5" placeholder="Type your message here" onChange={(e) => this.handleInput("userMsg",e)}></textarea>
						</form>

						<button type="button" className="contactButton" onClick={()=>this.sendMail()}>Send E-Mail</button>
					</div>
				</div>
			</div>
		);
	}
}

export default ContactPage;
