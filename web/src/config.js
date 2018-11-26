export default {
	baseURL:
		process.env.NODE_ENV === 'production'
			? 'http://m2m-dev.eu-central-1.elasticbeanstalk.com'
			: '/',
};
