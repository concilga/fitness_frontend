import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Link, useParams, useHistory } from 'react-router-dom';

const PostDetail = ({postResults, token, user, setPostResults}) => {  
    const {id} = useParams()
    const [message, setMessage] = useState('');
    const [messageUser, setMessageUser] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    if (!postResults.posts) {
        return (
            <></>
        )
    }

    const individualPost = postResults.posts.filter(
        (post) => post._id === id
    );

    async function fetchPosts() {
        const response = await fetch('https://strangers-things.herokuapp.com/api/2110-FTB-ET-WEB-PT/posts');
        const info = await response.json();
        setPostResults(info.data);
    }

    const handleClick = async() => {
        setError("");

        const response = await fetch(`https://strangers-things.herokuapp.com/api/2110-FTB-ET-WEB-PT/posts/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        const info = await response.json();

        if(info.error) {
            return setError(info.error.message);
        }

        fetchPosts();
        history.push("/Posts");

    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        setError("");
        setMessage('');

        const response = await fetch(`https://strangers-things.herokuapp.com/api/2110-FTB-ET-WEB-PT/posts/${id}/messages`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                message: {
                    content: message
                }
            })
        });
        const info = await response.json();

        if(info.error) {
            return setError(info.error.message);
        }

        fetchPosts();
        setMessage('');

        history.push("/Posts");

    }

    const handleSubmitUser = async(event) => {
        event.preventDefault();
        setError("");
        console.log(individualPost);

        const response = await fetch(`https://strangers-things.herokuapp.com/api/2110-FTB-ET-WEB-PT/posts/${id}/messages`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                message: {
                    content: messageUser
                }
            })
        });
        const info = await response.json();

        if(info.error) {
            return setError(info.error.message);
        }

        console.log(error);
        fetchPosts();

        history.push("/Posts");
    }

    return (
        <div className='post-detail'>
            {individualPost[0].isAuthor ? (
                <>
                <div className='public-post'>
                    <h1>{individualPost[0].title}</h1>
                    <h3>Description: {individualPost[0].description}</h3>
                    <h3>Price: {individualPost[0].price}</h3>
                    <h3>Location: {individualPost[0].location}</h3>
                    <h3>Will Deliver: {individualPost[0].willDeliver}</h3>
                </div>
                <div>
                    <button>
                        <Link to={`/EditPost/${individualPost[0]._id}`}>Edit</Link>
                    </button>
                    <button onClick={handleClick}>Delete</button>
                </div>
                <div>
                    <h2 id="message-title">Messages:</h2>
                    <div>
                        {individualPost[0].messages ? (
                        individualPost[0].messages.map(message => {
                                return (
                                    <div key={message._id} id="message-box">
                                        <div>
                                            <h2 id="message-title">Message:</h2>
                                            <h3>{message.content}</h3>
                                        </div>
                                        <div>
                                            <h3>From: {message.fromUser.username}</h3>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <h2>No Messages Yet!</h2>
                        )}

                        {individualPost[0].messages ? (
                            <form className="addPost-form" onSubmit={handleSubmitUser}>
                                <label htmlFor='title'>Respond:</label>
                                <input required type='text' name='message' value={messageUser} 
                                    onChange={(event) => setMessageUser(event.target.value)}/>
                                <button type='submit'>Submit</button>
                            </form>
                        ) : (
                            null
                        )}

                    </div>
                </div>
                </>
            ) : (
                <>
                <div className='public-post'>
                    <h1>{individualPost[0].title}</h1>
                    <h3>Description: {individualPost[0].description}</h3>
                    <h3>Price: {individualPost[0].price}</h3>
                    <h3>Location: {individualPost[0].location}</h3>
                    <h3>Will Deliver: {individualPost[0].willDeliver}</h3>
                </div>
                <div>
                    <h2>Creator: {individualPost[0].author.username}</h2>
                    <form className="addPost-form" onSubmit={handleSubmit}>
                        <label htmlFor='title'>Message:</label>
                        <input required type='text' name='message' value={message} 
                            onChange={(event) => setMessage(event.target.value)}/>
                        <button type='submit'>Submit</button>
                    </form>
                </div>
                </>
            )}
        </div>
    )
}

export default PostDetail; 