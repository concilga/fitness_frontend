import {React, useState} from 'react'
import { Link } from 'react-router-dom';

const Posts = ({postResults, token}) => {
    if(!postResults.posts){
        return (
            <></>
        )
    }

    const [searchTerm, setSearchTerm] = useState('');

    function postMatches(post, text) {  
        if (post.author.username.toLowerCase().includes(text) || post.description.toLowerCase().includes(text) ||
            (post.description.toLowerCase().includes(text) || post.location.toLowerCase().includes(text) || 
            post.price.toLowerCase().includes(text) || post.title.toLowerCase().includes(text))
        ){
            return true;
        } else {
            return false;
        }
    }

    const filteredPosts = postResults.posts.filter(post => postMatches(post, searchTerm));
    const postsToDisplay = searchTerm.length ? filteredPosts : postResults.posts;
    
    return (
        <div className="posts-page">
            <div className="post-header">
                <h2>Posts</h2>
                <form className="add-post-form">
                    <label htmlFor='title'>Search:</label>
                    <input required type='text' name='searchTerm' value={searchTerm} 
                        onChange={(event) => setSearchTerm(event.target.value)}/>
                </form>
                {token  ? (
                    <button id="add-post-btn">
                        <Link to="/AddPost">Add Post</Link>
                    </button>
                ) : (
                    null
                )}
            </div>  
            {
                postResults.posts ? (
                    postsToDisplay.map(post => {
                        return (
                            <div key={post._id} className="public-posts">
                                <div id="card-header">
                                    <h1>{post.title}</h1>
                                </div>
                                <div id="card-body">
                                    <p>Description: {post.description}</p>
                                    <h4>Price: {post.price}</h4>
                                </div>
                                <div id="card-footer">
                                    <h3>{post.author.username}</h3>
                                    <h4>{post.location}</h4>
                                </div>
                                {token ? (
                                    <button id="card-button">
                                        <Link to={`/PostDetail/${post._id}`}>Details</Link>   
                                    </button>
                                ) : (
                                    null
                                )}
                            </div>

                        )
                    })
                ) : (
                    null
                )
            }
        </div>
    );
        
}

export default Posts;