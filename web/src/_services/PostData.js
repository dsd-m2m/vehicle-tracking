//import { alertActions } from '../_actions';
import config from '../config';

export function PostData(type, socialToken) {
	let BaseURL = config.baseURL + '/api/auth/login';

	return new Promise((resolve, reject) => {
		fetch(BaseURL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				social_token: socialToken,
			}),
		})
			.then(response => {
				if (!response.ok) throw response.status;
				else return response.json();
			})
			.then(resp => {
				//console.log(resp);
				resolve(resp);
			})
			.catch(error => {
				console.log('Problem with fetching from server');
				reject(error);
			});
	});
}
