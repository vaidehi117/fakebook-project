import tokenService from "./tokenService";

const BASE_URL = '/api/'

// The user is logged in, so what do you have to include
export function create(postId) {
	return fetch(`${BASE_URL}posts/${postId}/likes`, {
		method: 'POST',
		headers: {
			//Convention for sending jwts		
			Authorization: "Bearer " + tokenService.getToken() // < this is how we get the token from localstorage and and it to our api request
			//So the server knows who the request is coming from when the client is trying to make a POST
		}
	}).then(responseFromTheServer => {
		if (responseFromTheServer.ok) return responseFromTheServer.json() // 
		throw new Error('Something went wrong in delete Like');
	})
}

export function removeLike(likeId) {
	return fetch(`${BASE_URL}likes/${likeId}`, {
		method: 'DELETE',
		headers: {
			//Convention for sending jwts	
			Authorization: "Bearer " + tokenService.getToken() // < this is how we get the token from localstorage and and it to our api request
			//So the server knows who the request is coming from when the client is trying to make a POST
		}
	}).then(responseFromTheServer => {
		if (responseFromTheServer.ok) return responseFromTheServer.json() // 
		throw new Error('Something went wrong in delete Like');
	})
}