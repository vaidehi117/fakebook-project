import { Card } from 'semantic-ui-react';
import PostCard from '../PostCard/PostCard';

export default function PostGallery({ posts }) {
    const postCards = posts.map((post) => {
        return <PostCard post={post} key={post._id} />
    })

    return (
        <Card.Group itemsPerRow={1}>
            {postCards}
        </Card.Group>
    )
}

