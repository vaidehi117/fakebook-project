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

export default function LoginPage(props) {

  const [state, setState] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  //This function takes a path define in App.js for our routes
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefult();

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
        <Form size='large'>
          <Segment stacked>
            <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
            />
            <Button color='blue' fluid size='large'>
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <a href='/signup'>Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
}

