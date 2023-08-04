import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import AddPost from "../../components/AddPost/AddPost";
import PostGallery from "../../components/PostGallery/PostGallery";
import { Grid } from "semantic-ui-react";
//This will import all the functions from postApi, and attach to an object call postsApi
import * as postsApi from "../../utils/postApi";


export default function FeedPage({ user, handleLogout }) {

    //The reasons we are setting posts state, is because then we can pass that data to the postGallery
    //Where it will be rendered
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');

    //CRUD
    //we will call this function in the handlesubmit of the AddPost, and pass to it
    //the formData we created 
    //this way when we get a response from the server we can easily update the state, since it's in the component
    async function handleAddPost(data) {
        try {
            const responseData = await postsApi.create(data);
            console.log(responseData, " <- response from server in handleAddPost");
            setPosts([responseData.data, ...posts]); // emptying the previous posts in to the new
            // and then adding the new one we just created to the front (response.data)
        } catch (err) {
            console.log(err, " err in handleAddPost FeedPage");
            setError("Error Creating a Post! Please try again");
        }
    }

    // C(R)UD
    async function getPosts() {
        try {
            // this is the fetch function from post utils
            const responseFromTheServer = await postsApi.getAll(); 
            console.log(responseFromTheServer);
            setPosts(responseFromTheServer.posts);
        } catch (err) {
            console.log(err, " err in getPosts");
            setError("Error Fetching Posts, Check terminal");
        }
    }

    useEffect(() => {
        getPosts();
    }, []); // empty array says run the use effect once when the page loads up!

    return (
        <Grid centered>
            <Grid.Row>
                <Grid.Column>
                    <Header />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <AddPost handleAddPost={handleAddPost} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <PostGallery posts={posts} />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}