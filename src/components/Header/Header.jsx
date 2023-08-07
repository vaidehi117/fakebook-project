import { Grid, Header, Segment, Image, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function PageHeader({ user, handleLogout }) {
  return (
    <Segment clearing color='blue'>
      <Header as="h2" floated="right">
        <Link to="/">
          <Icon name="sign-out"></Icon>
        </Link>
        <Link to="/login" onClick={handleLogout}>
          Logout
        </Link>
      </Header>
      <Header as="h2" floated="right">
        <Link>
          <Icon name="inbox"></Icon>
        </Link>
        <Link>
          Chats
        </Link>
      </Header>
      <Header as="h2" floated="right">
        <Link to="/">
          <Icon name="home"></Icon>
        </Link>
        <Link to="/" >
          Feed
        </Link>
      </Header>
      <Header as="h2" floated="left">
        <Link to={`/${user?.username}`}>
          <Image
            src={
              user?.photoUrl
                ? user?.photoUrl
                : "https://react.semantic-ui.com/images/wireframe/square-image.png"
            }
            avatar
          ></Image>
        </Link>
      </Header>
    </Segment>
  );
}
