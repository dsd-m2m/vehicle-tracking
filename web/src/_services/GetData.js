//import { alertActions } from '../_actions';
import config from '../config';

export function GetData(type) {
	let BaseURL = config.baseURL + '/api/' + type;

	return new Promise((resolve, reject) => {
		let auth = JSON.parse(localStorage.getItem('jwt'));
		fetch(BaseURL, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + auth,
			},
		})
			.then(response => {
				if (!response.ok) throw response.status;
				else return response.json();
			})
			.then(resp => {
				console.log(resp);
				resolve(resp);
			})
			.catch(error => {
				console.log('Problem with fetching from server');
				reject(error);
			});
	});
}
