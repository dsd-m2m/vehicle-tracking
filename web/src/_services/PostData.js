import { alertActions } from '../_actions';


export function PostData(type, socialToken) {
	let BaseURL = '/api/auth/login';
	fetch(BaseURL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			"social_token": socialToken
		})
	})
		.then((resp) => resp.json()) 
		.then(function (response) {
			console.log(response);
			//const { dispatch } = this.props;

			//if (response.payload.status !== 200) {
			//	dispatch(alertActions.error(response.payload.status.toString()));
			//}

			//else {
			//	localStorage.setItem('jwtToken', response.payload.data.token);
			//	return dispatch(alertActions.success(response.payload.status.toString()));
			//}
		});
}