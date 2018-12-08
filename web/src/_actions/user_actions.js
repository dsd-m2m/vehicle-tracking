import jwt from 'jsonwebtoken';

export const userActions={
	getToken,
	isTokenExpired
};

function getToken(){
	return localStorage.getItem('jwt');
}

function isTokenExpired() {
	var isExpired = false;
	if(!localStorage.getItem('jwt')){
		return isExpired=true;
	}
	const token = JSON.parse(localStorage.getItem('jwt'));
	var decodedToken=jwt.decode(token, {complete: true});
	var dateNow = new Date();
	if(decodedToken.exp < dateNow.getTime()){
   		 isExpired = true;
   	}

   	return isExpired;
}




