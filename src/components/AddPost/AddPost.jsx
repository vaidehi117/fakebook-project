import React, { useState } from 'react';
import {
    Button,
    Form,
    Grid,
    Segment
} from "semantic-ui-react";

export default function AddPost() {

    //Create the state
    const [state, setState] = useState({
        caption: ''
    })
    const [selectedFile, setSelectedFile] = useState('');

    function handleFileInput(e) {
        setSelectedFile(e.target.files[0])
    }

    function handleChange(e){
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    //Handles that change on the input, Looks at the inputs for the name of it 
    function handleSubmit(e) {
        //Since we are sending file, prepare the object ad FormData to send to the server
        const formData = new FormData()
        formData.append('caption', state.caption)
        formData.append('photo',selectedFile)

        //call handleAddPost which calls our postsApi.create function in the utils folder
        handleAddPost(formData)
    }

    return (
        <Segment>
            <Form autoComplete="off" onSubmit={handleSubmit}>
                <Form.Input
                    className="form-control"
                    name="caption"
                    value={state.caption}
                    placeholder="Write a caption..."
                    onChange={handleChange}
                    required
                />
                <Form.Input
                    className="form-control"
                    type="file"
                    name="photo"
                    placeholder="upload image"
                    onChange={handleFileInput}
                />
                <Button type="submit" color='blue' className="btn"fluid size='large'>
                    SHARE
                </Button>
            </Form>
        </Segment>
    )
}

