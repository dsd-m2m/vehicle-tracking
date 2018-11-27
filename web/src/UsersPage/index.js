import React from 'react';
import api from '../api';

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
	
	getUsers = () => {
		api('GET', 'user')
			.then(res => this.setState({ users: res.data }))
			.catch(e => {
				console.log(e);
			});
	};

	render() {
		return (
			<div className="UsersList">
				<h2>Users</h2>
				{this.state.users.map((user, index) => {
					return (
						<ol key={index}>
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
		);
	}
}

export default UsersPage;
