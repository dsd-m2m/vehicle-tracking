import axios from 'axios';
import config from './config';

const api = (method, path, data, params, headers) => {
	if (!method) throw new Error('Method is a required field.');
	if (!path) throw new Error('Path is a required field.');

	const options = {
		method: method.toUpperCase(),
		baseURL: config.apiURL,
		url: path,
		data: data || {},
		params: params || {},
		headers: {
			Authorization: `Bearer ${localStorage.getItem('jwt')}`,
			'Content-Type': 'application/json',
			...headers,
		},
	};

	return axios(options);
};

export default api;
