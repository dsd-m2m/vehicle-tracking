import { alertActions } from '../_actions';


export function PostData(type, userData) {
	let BaseURL = 'https://localhost:5000/api/auth/login';
	fetch(BaseURL, {
    	method: 'POST',
   		Authorization: userData.token
	})
	.then((response) => {
		const { dispatch }=this.props;

		if (response.payload.status !== 200){
			dispatch(alertActions.error(response.payload.status.toString()));
		}

		else{
			localStorage.setItem('jwtToken',response.payload.data.token);
			return dispatch(alertActions.success(response.payload.status.toString()));	
		}
	});	
}