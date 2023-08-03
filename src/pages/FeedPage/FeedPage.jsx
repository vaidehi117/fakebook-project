import { useState } from "react";
import Header from "../../components/Header/Header";
import AddPost from "../../components/AddPost/AddPost";
import PostGallery from "../../components/PostGallery/PostGallery";
import { Grid } from "semantic-ui-react";
//This will import all the functions from postApi, and attach to an object call postsApi
import * as postsApi from "../../utils/postApi";

export default function FeedPage() {

    //The reasons we are setting posts state, is because then we can pass that data to the postGallery
    //Where it will be rendered
    const [posts, setPosts] = useState([]);
    const[error, setError] = useState('');

    //CRUD
    //we will call this function in the handlesubmit of the AddPost, and pass to it
    //the formData we created 
    //this way when we get a response from the server we can easily update the state, since it's in the component
    async function handleAddPost(data){
        try{

        }catch(err){
            console.log(err, 'err in the handleAddPost FeedPage');
            setError('Error Creating a Post!');
        }
    }

    return (
        <Grid centered>
            <Grid.Row>
                <Grid.Column>
                    <Header handleLogout={handleLogout} user={user} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <AddPost handleAddPost={handleAddPost} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <PostGallery posts={posts} itemsPerRow={1} isProfile={false} addLike={addLike} removeLike={removeLike} user={user}/>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}