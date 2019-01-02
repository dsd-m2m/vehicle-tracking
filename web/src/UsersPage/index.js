import React from 'react';
import api from '../api';
import Header from '../_components/Header';


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
				<div className="list">
					<h2>Users</h2>
					{this.state.users.map((user, index) => {
						return (
							<ol className="usersList" key={index}>
								{index + 1}.UserID:{user.id}
								<br />
								Username:{user.username}
								<br />
								Email:"{user.email}"<br />
								Role:{user.roleId === 1 ? 'Vehicle owner' : 'OEM user'}
							</ol>
						);
					})}
				</div>
			</div>
		);
	}
}

export default UsersPage;
