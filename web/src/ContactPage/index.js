import React from 'react';

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
			<div className="contactPage">
				
				
				<div className="contactTile">
					<div className="contact">
						<div className="form">
							<form action="mailto:frano.mirkovic@fer.hr">
								<input className="ContactPageInput" type="text" id="name" placeholder="Name" onChange={(e) => this.handleInput("userName",e)}></input>
								<input className="ContactPageInput" type="text" placeholder="E-Mail" onChange={(e) => this.handleInput("userMail",e)}></input>
								<textarea id="msg" cols="10" rows="5" placeholder="Type your message here" onChange={(e) => this.handleInput("userMsg",e)}></textarea>
								<input type="submit" className="contactButton" value="Send" />
							</form>

							{/*<button type="button" href="mailto:Frano.Mirkovic@FER.hr" className="contactButton" onClick={()=>this.sendMail()}>Submit</button>*/}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ContactPage;
