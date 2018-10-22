Basic configuration of server with google signin logic.

Also, in '/static' folder is a simple frontend app which is served on http://localhost:5000 with the server, and should be used to better explain the authentication logic, certainly, this is similar to the logic which will be used by the frontend guys (should be helpful for testing locally)

In the future I will add swagger description of the api, but for now we have these testing endpoints:

GET /ping 		-> public api for checking the server liveness
GET /api/ping 	-> protected api, accessible only for logged in users
POST /auth/token -> login api which receives json in req body like this:
			
				{
					code: GOOGLE_SOCIAL_TOKEN
					type: "google"
				}

				The 'code', or google token is validated on the server, and the backend-api jwt token is returned, along with the user info. This new jwt token will be used for every request to the protected /api.

- installation: 
	- "npm install" (install dependencies)
	- "npm start"   (start server)