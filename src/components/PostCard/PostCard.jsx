import React from 'react';
import { Card, Icon, Image } from "semantic-ui-react";

export default function PostCard({ post }) {

  // if the user has not like the post
  // the click on the heart should make the post request, postAPi.create

  // if the user has liked the post
  // when the click on the heart they should make a delete request, postApi.removeLike


  // Find out if the logged in user (user) is in the post.likes array
  const likedIndex = post.likes.findIndex(like => like.username === user.username);
  // If the user's username is in the likes array of the post, return the index of that object in the post.likes array
  // if findIndex doesn't find a match it returns -1

  // if the user has liked the post, likedIndex be greater then negative 1 so the likeColor should be red
  const likeColor = likedIndex > -1 ? 'blue' : 'grey';

  // if the user has liked the post, we need to call our removeLike function (is there anything we need to pass to it?)
  // if the user has not liked the post, we need to call our addLike function (is there anything we need to pass to it?)
  const clickHandler = likedIndex > -1 ? () => removeLike(post.likes[likedIndex]._id) : () => addLike(post._id)


  return (
    <Card key={post._id}>
      {isProfile ? null : (
        <Card.Content textAlign="left">
          <Image
            floated="left"
            size="large"
            avatar
            src={
              post.user.photoUrl
                ? post.user.photoUrl
                : "https://react.semantic-ui.com/images/wireframe/square-image.png"
            }
          />
          <Card.Header floated="right">{post.user.username}</Card.Header>
        </Card.Content>
      )}

      <Image src={`${post.photoUrl}`} wrapped ui={false} />
      <Card.Content>
        <Card.Description>{post.caption}</Card.Description>
      </Card.Content>
      <Card.Content extra textAlign={"right"}>
        <Icon name={"Thumbs up"} size="large" color={likeColor} onClick={clickHandler} />
        {post.likes.length} Likes
      </Card.Content>
    </Card>
  );
}


