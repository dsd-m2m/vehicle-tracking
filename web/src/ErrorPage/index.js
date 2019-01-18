import React from 'react';


//It renders when user tries to get to unknown component
class ErrorPage extends React.Component {

	render() {
		return (
			<div className="ErrorPage">
				<h1>Error 404:<br/>Page not found</h1>
			</div>
		);
	}
}

export default ErrorPage;
