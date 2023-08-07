import React from 'react';
import './LoginPage.css';
import { useState } from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import userService from '../../utils/userService';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage({ handleSignUpOrLogin }) {

  const [state, setState] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  //This function takes a path define in App.js for our routes
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      //Making the http request to the server
      await userService.login(state)
      navigate('/')
      //This comes from app.js as a prop, Which it gets the token from localstorage and stores the decoded
      //Token in the app.js state
      handleSignUpOrLogin()
    } catch (err) {
      console.log(err, 'err in handleSubmit Loginpage');
      setError('Check terminal and console')
    }
  }

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='blue' textAlign='center'>
          <Image src='https://upload.wikimedia.org/wikipedia/commons/c/cd/Facebook_logo_%28square%29.png' /> Log-in to your account
        </Header>
        <Form size='large' onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid icon='user circle'
              iconPosition='left'
              type="email"
              name="email"
              placeholder="E-mail address"
              value={state.email}
              onChange={handleChange}
              required
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              name="password"
              placeholder='Password'
              type='password'
              value={state.password}
              onChange={handleChange}
              required
            />
            <Button color='blue' fluid size='large'>
              Login
            </Button>
          </Segment>
          <Message>
            New to us? <Link to="/signup">Sign up</Link>
          </Message>
          {error ? <ErrorMessage error={error} /> : null}
        </Form>
      </Grid.Column>
    </Grid>
  );
}

