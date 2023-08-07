import tokenService from './tokenService';

const BASE_URL = '/api/users/';


//This fetch request is making http POST request to our server 
//POST /api/users/signup
function signup(user) {
  return fetch(BASE_URL + 'signup', {
    method: 'POST',
    //When you're sending a file there should no headers, the browser will detect request, 
    //And apply the proper headers `multipart/formdata` request enctype
    //headers: new Headers({'Content-Type': 'application/json'}),  // If you are sending a file/photo over
    //What do datatype do you need to change this too?
    //This is the contents of the form that you want to send to the server
    //User must be an object in order JSONIFY
    body: user // if user is formData no need to jsonify
  })
    //The .thens occur when we get a response from the server!
    .then(res => {
      if (res.ok) return res.json();
      //Probably a duplicate email
      throw new Error('Email already taken!');
    })
    //Parameter destructuring!
    .then(({ token }) => tokenService.setToken(token));
  //The above could have been written as
  //.then((token) => token.token);
}

function getUser() {
  return tokenService.getUserFromToken();
}

function logout() {
  tokenService.removeToken();
}

function login(creds) {
  return fetch(BASE_URL + 'login', {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(creds)
  })
    .then(res => {
      //Valid login if we have a status of 2xx (res.ok)
      if (res.ok) return res.json();
      throw new Error('Bad Credentials!');
    })
    .then(({ token }) => tokenService.setToken(token));
}

//Yu are logged in so what you need to send in the header!
function getProfile(username) {
  return fetch(`${BASE_URL}${username}`, {
    method: 'GET',
    headers: {
      //Convention for sending jwts
      Authorization: "Bearer " + tokenService.getToken() // < this is how we get the token from localstorage and and it to our api request
      //So the server knows who the request is coming from when the client is trying to make a POST
    }
  }).then(responseFromTheServer => {
    if (responseFromTheServer.ok) return responseFromTheServer.json() //So if everything went well in the response return 
    //The parsed json to where we called the function
    throw new Error('Something went wrong in getAll posts, check the terminal!'); //This will go to the catch block when we call the function in the AddPost
    //handleSubmit
  })
}

export default {
  signup,
  getUser,
  logout,
  login,
  getProfile
};