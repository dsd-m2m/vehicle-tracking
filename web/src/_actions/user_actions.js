import jwt from 'jsonwebtoken';

export const userActions={
	getToken,
	isTokenExpired
};

function getToken(){
	return localStorage.getItem('jwtToken');
}

function isTokenExpired() {
	var isExpired = false;
	const token = localStorage.getItem('jwtToken');
	var decodedToken=jwt.decode(token, {complete: true});
	var dateNow = new Date();

	if(decodedToken.exp < dateNow.getTime()){
   		 isExpired = true;
   	}

   	return isExpired;
}



