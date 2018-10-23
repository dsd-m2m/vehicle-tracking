Basic configuration of server with google signin logic.


In the future I will add swagger description of the api, but for now we have these testing endpoints:

GET /ping/public		-> public endpoint for checking the server liveness
GET /ping/secure 		-> protected endpoint, accessible only for logged in users (via google login)
POST /auth/login 		-> public login endpoint which receives json in req body like this:
			
				{
					code: GOOGLE_SOCIAL_TOKEN
					type: "google"
				}

The 'code', or google token is validated on the server, and the backend-api jwt token is returned, along with the user info. This new jwt token will be used for every request to the protected endpoints

- installation: 
	- "npm install" (install dependencies)
	- "npm start"   (start server)