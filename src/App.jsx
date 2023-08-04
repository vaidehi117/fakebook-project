import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { useState } from 'react';

import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignupPage/SignupPage";
import userService from "./utils/userService";
import FeedPage from "./pages/FeedPage/FeedPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

// ANY Component rendered by a ROUTE, goes in the pages folder!
// Client side routing, Just for showing or hiding components based on the address
// in the url
export default function App() {

  // this will the get token from localstorage and decode it when the page loads up 
  // and set it as our initial state
  // if there is a token, user will be the user object, if there is not token user will null
  const [user, setUser] = useState(userService.getUser());

  function handleSignUpOrLogin() {
    setUser(userService.getUser())
  }

  function handleLogout() {
    //Removing the JWT token from local storage
    userService.logout();
    //Set the user to null se we don't have the previously logged in user
    //In the state 
    setUser(null)
  }

  if (!user) {
    //If the user is not logged in only render the following routes
    return (
      <Routes>
        <Route path="/login" element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />} />
        <Route path="/signup" element={<SignUpPage handleSignUpOrLogin={handleSignUpOrLogin} />} />
        <Route path="/*" element={<Navigate to='/login' />} />
      </Routes>
    )
  }

  //If the user is logged in render the following routes 
  return (
    <Routes>
      <Route path="/" element={<FeedPage handleSignUpOrLogin={handleSignUpOrLogin} />} />
      <Route path="/login" element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />} />
      <Route path="/signup" element={<SignUpPage handleSignUpOrLogin={handleSignUpOrLogin} />} />
      <Route path="/:username" element={<ProfilePage user={user} handleLogout={handleLogout}/> } />
    </Routes>
  );
}
