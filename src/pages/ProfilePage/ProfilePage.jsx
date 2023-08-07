import { useState, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { useParams } from "react-router-dom";
import ProfileBio from '../../components/ProfileBio/Profilebio';
import PostGallery from '../../components/PostGallery/PostGallery';
import Header from '../../components/Header/Header';
import userService from '../../utils/userService';
import * as likesApi from '../../utils/likesApi';

export default function ProfilePage({ user, handleLogout }) {

    const [posts, setPosts] = useState([]);
    const [userState, setUserState] = useState({});
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    //Grabbing the param from this route
    //<Route path="/:username" element={<ProfilePage />} />
    const { username } = useParams();
    console.log(username);

    //EVERY TIME WE UPDATE STATE here, We will first make http request to the server
    //To try and perform some CRUD operation.
    async function addLike(postId) {
        try {
            const response = await likesApi.create(postId);
            //To update state we are just going to refetch the posts, because they will the updated
            // likes
            getProfile(); //This funciton updates state

        } catch (err) {
            setError('error creating like')
            console.log(err, ' error')
        }
    }

    async function removeLike(likeId) {
        try {
            const response = await likesApi.removeLike(likeId);
            //To update state we are just going to refetch the posts, because they will the updated
            //Likes
            getProfile(); //This funciton updates state

        } catch (err) {
            setError('error creating like')
            console.log(err, ' error')
        }
    }

    async function getProfile() {
        //Make the api call
        //Log the response
        //Update the state
        try {
            setLoading(true);
            const response = await userService.getProfile(username);
            console.log(response);
            setPosts(response.posts);
            setUserState(response.user);
            setLoading(false)
        } catch (err) {
            setError("Error loading the Profile page");
            console.log(err, "err in profile page");
        }
    }

    useEffect(() => {

        getProfile();
    }, [username]);

    if (loading) {
        return (
            <>
                <Header handleLogout={handleLogout} user={user} />
                <h1>Loading....</h1>
            </>
        );
    }

    return (
        <Grid>
            <Grid.Row>
                <Grid.Column>
                    <Header handleLogout={handleLogout} user={user} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <ProfileBio user={user}/>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row centered>
                <Grid.Column style={{ maxWidth: 750 }}>
                    <PostGallery posts={posts} itemsPerRow={1} isProfile={true} user={user} addLike={addLike} removeLike={removeLike} />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}