import tokenService from './tokenService';

const BASE_URL = '/api/users/';

function signup(user) {
  return fetch(BASE_URL + 'signup', {
    method: 'POST',
    // when you're sending a file there should no headers, the browser will detect request, 
    // and apply the proper headers `multipart/formdata` request enctype
    // headers: new Headers({'Content-Type': 'application/json'}),  // If you are sending a file/photo over
    // what do datatype do you need to change this too?
    // this is the contents of the form that you want to send to the server
    // user must be an object in order JSONIFY
    body: user // if user is formData no need to jsonify
  })
    // the .thens occur when we get a response from the server!
    .then(res => {
      if (res.ok) return res.json();
      // Probably a duplicate email
      throw new Error('Email already taken!');
    })
    // Parameter destructuring!
    .then(({ token }) => tokenService.setToken(token));
  // The above could have been written as
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
      // Valid login if we have a status of 2xx (res.ok)
      if (res.ok) return res.json();
      throw new Error('Bad Credentials!');
    })
    .then(({ token }) => tokenService.setToken(token));
}

export default {
  signup,
  getUser,
  logout,
  login
};