import {useState} from 'react';

export default function ProfilePage(){

    const [userState, setUserState] = useState({});
    const [error, setError] = useState("")

    async function getProfile(){
        //Make the api call
        //Log the response
        //Update the state
        try{

        }catch(err){
            setError("Error loading the Profile page");
            console.log(err, "err in profile page");
        }
    }

    return (
        <h1>Profile page</h1>
    )
}