import { useState, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { useParams } from "react-router-dom";
import ProfileBio from '../../components/ProfileBio/Profilebio';
import PostGallery from '../../components/PostGallery/PostGallery';
import Header from '../../components/Header/Header';
import userService from '../../utils/userService';

export default function ProfilePage() {

    const [posts, setPosts] = useState([]);
    const [userState, setUserState] = useState({});
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    // grabbing the param from this route
    //  <Route path="/:username" element={<ProfilePage />} />
    const { username } = useParams();
    console.log(username);

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
                <PageHeader handleLogout={handleLogout} user={user} />
                <h1>Loading....</h1>
            </>
        );
    }

    return (
        <Grid>
            <Grid.Row>
                <Grid.Column>
                    <Header />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <ProfileBio />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row centered>
                <Grid.Column style={{ maxWidth: 750 }}>
                    <PostGallery />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}