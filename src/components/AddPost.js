import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Link, useHistory } from 'react-router-dom';

const AddPost = ({token, setPostResults}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [error, setError] = useState('');

    const history = useHistory();

    async function fetchPosts() {
        const response = await fetch('https://strangers-things.herokuapp.com/api/2110-FTB-ET-WEB-PT/posts');
        const info = await response.json();
        setPostResults(info.data);
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        setError("");

        const response = await fetch('https://strangers-things.herokuapp.com/api/2110-FTB-ET-WEB-PT/posts', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                post: {
                    title,
                    description,
                    price,
                    location
                }
            })
        });
        const info = await response.json();

        if(info.error) {
            return setError(info.error.message);
        }

        fetchPosts();
        
        history.push("/Posts");

    }



    return (
        <div id='addPost-container'>
            <div id='addPost-title'>
                <h2>Please Fill Out the Information Below to Create a New Post!</h2>
            </div>
            <form className="addPost-form" onSubmit={handleSubmit}>
              <label htmlFor='title'>Title:</label>
              <input required type='text' name='title' value={title} 
                onChange={(event) => setTitle(event.target.value)}/>
              <label htmlFor='description'>Description:</label>
              <input required type='description' name='description' value={description} 
                onChange={(event) => setDescription(event.target.value)}/>
              <label htmlFor='price'>Price:</label>
              <input required type='price' name='price' value={price} 
                onChange={(event) => setPrice(event.target.value)}/>
              <label htmlFor='location'>Location:</label>
              <input required type='location' name='location' value={location} 
                onChange={(event) => setLocation(event.target.value)}/>
              <button type='submit'>Submit</button>
            </form>
            <p>{error}</p>
      </div>
    )
}

export default AddPost;