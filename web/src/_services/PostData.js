export function PostData(type, userData) {
	let BaseURL = 'https://localhost:5000/api/auth/login';

	return new Promise((resolve, reject) =>{
		fetch(BaseURL, {
    	method: 'POST',
   		Authorization: userData.token
	})
	.then((response) => response.json())
	.then((res) => {
    	resolve(res);
	})
	.catch((error) => {
   		reject(error);
	});

	});
}