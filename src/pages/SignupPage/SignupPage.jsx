import { useState } from "react";
import userService from "../../utils/userService";
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import {
    Button,
    Form,
    Grid,
    Header,
    Image,
    Message,
    Segment,
} from "semantic-ui-react";
import { useNavigate, Link } from "react-router-dom";

export default function SignUpPage() {

    const [state, setState] = useState({
        username: '',
        email: '',
        password: '',
        passwordConf: '',
        bio: ''
    })
    const [error, setError] = useState('');
    const [selectedFile, setSelectedFile] = useState('');

    // navigate is a function that just takes a path
    // the path should match a route defined in the App.js
    const navigate = useNavigate()

    function handleChange(e) {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    function handleFileInput(e) {
        console.log(e.target.files);
        setSelectedFile(e.target.files[0])
    }

    async function handleSubmit(e){
        e.preventDefault();

        // ANYTIME YOU'RE SENDING A FILE TO THE SERVER
        // You must create formdata!
        // This needs to be done because the http request
        // will be sent in two parts, the text, and the file
        const formData = new FormData();
        // key on req.file would be photo, 
        formData.append('photo', selectedFile);
        // req.body formdata
        formData.append('username', state.username)
        formData.append('email', state.email)
        formData.append('password', state.password)	
        formData.append('bio', state.bio)

        // this for loop does the same thing as the code above ^^^
        // for (let key in state){
        // 	formData.append(key, state[fieldName])
        // }



        try {
            // this line of code is making the fetch request to the server
            // and sending our state object
            // this is calling the signup fetch function defined in our utils/userService
            const signUp = await userService.signup(formData)
            console.log(signUp)
            // navigate the user to the home page!
            navigate('/');
            handleSignUpOrLogin(); // this function comes from the APP component

        } catch(err){
            console.log(err, ' err in handleSubmit');
            setError('Check your terminal for your error and the chrome console!')
        }

    }

    return (
        <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h2" color="blue" textAlign="center">
                    <Image src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Facebook_logo_%28square%29.png" /> Sign Up
                </Header>
                <Form autoComplete="off" onSubmit={handleSubmit}>
                    <Segment stacked>
                        <Form.Input
                            fluid icon='user'
                            iconPosition='left'
                            name="username"
                            placeholder="Username"
                            value={state.username}
                            onChange={handleChange}
                            required
                        />
                        <Form.Input
                            fluid icon='user'
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
                            type="password"
                            placeholder="password"
                            value={state.password}
                            onChange={handleChange}
                            required
                        />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            name="passwordConf"
                            type="password"
                            placeholder="Confirm Password"
                            value={state.passwordConf}
                            onChange={handleChange}
                            required
                        />
                        <Form.TextArea
                            label="Bio"
                            name="bio"
                            placeholder="What's on your mind!"
                            onChange={handleChange}
                        />
                        <Form.Field>
                            <Form.Input
                                type="file"
                                name="photo"
                                placeholder="upload image"
                                onChange={handleFileInput}
                            />
                        </Form.Field>
                        <Button type="submit" color='blue' className="btn" fluid size='large'>
                            Signup
                        </Button>
            
                    </Segment>
                    {error ? <ErrorMessage error={error} /> : null}
                </Form>
            </Grid.Column>
        </Grid>

    );
}
