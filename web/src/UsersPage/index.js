import React from 'react';
import api from '../api';
import Header from '../_components/Header';


const h2style = {
	color: '#2D9CDB',
	fontFamily: 'Roboto',
	fontWeight: 'bold',
	fontSize: '48px',
	marginLeft: '5%',
	marginTop: '3%'
}

//conponent on route /users,it renders list of users in database with their name,email and role
class UsersPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			users: [],
		};
	}

	componentDidMount() {
		this.getUsers();
	}
	
	//when this route is accessed it fetches all users from server
	getUsers = () => {
		api('GET', 'user')
			.then(res =>this.setState({ users: res.data }))
			.catch(e => {
				console.log(e);
			});
	};

	render() {
		return (
			<div>
			 	<Header/>
				<div className="usersPage">
					<h2 style={h2style}>       Users</h2>
					{this.state.users.map((user, index) => {
						return (
							<div className="tileUsers">
								<ol key={index}>
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
										<b>username</b> <br/><br/>
										<b>email</b> <br/><br/>
										<b>role</b> <br/><br/> 
									</div>
									<div className="tile-right">
								 		<br/><br/>
										{user.id}
										<br /> <br/>
										{user.username}
										<br /> <br/>
										{user.email}
										<br /> <br/>
										{user.roleId === 1 ? 'Vehicle owner' : 'OEM user'}
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

export default UsersPage;
