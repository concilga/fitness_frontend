import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Link, useParams, useHistory } from 'react-router-dom';
// import {origionalPostDetail} from './PostDetail';

const EditPost = ({token, setPostResults, postResults}) => {

    const {id} = useParams()

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [error, setError] = useState('');

    const history = useHistory();
    
    const setTemplate = () => {

        const individualPost = postResults.posts.filter(
            (post) => post._id === id
        );

        setTitle(individualPost[0].title);
        setDescription(individualPost[0].description);
        setPrice(individualPost[0].price);
        setLocation(individualPost[0].location);
    }

    useEffect(() => {
        setTemplate();
    }, []);

    async function fetchPosts() {
        const response = await fetch('https://strangers-things.herokuapp.com/api/2110-FTB-ET-WEB-PT/posts');
        const info = await response.json();
        setPostResults(info.data);
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        setError("");

        const response = await fetch(`https://strangers-things.herokuapp.com/api/2110-FTB-ET-WEB-PT/posts/${id}`, {
            method: "PATCH",
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
        
        history.push(`/PostDetail/${id}`);
    }



    return (
        <div id='addPost-container'>
            <div id='addPost-title'>
                <h2>Please Edit the Information Below and Submit:</h2>
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

export default EditPost;