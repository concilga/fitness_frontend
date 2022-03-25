import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Link } from 'react-router-dom';

const Profile = ({user}) => {
    if(!user){
        return (
            <></>
        )
    }

    const [userRoutinesResults, setUserRoutineResults] = useState([]);

    async function fetchUserRoutines() {
        const response = await fetch('', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        const info = await response.json();
        setUserRoutineResults(info.data);
    }
    
    return(
            <div className="account-page">
                <header className="account-header">
                    <div className="account-functions">
                        <img id="profile-pic" src="https://img.icons8.com/bubbles/100/000000/test-account.png"/>
                        <h1>{user.username}</h1>
                    </div>
                    <div>
                        <h1 id="logo-account">🍊</h1>
                        <h1>Fitness App</h1>
                    </div>
                </header>
                <main className="account-body">
                    <h1 id="user-post-title">Your Post's!!</h1>
                    <>
                        {user ? (
                            existingRoutines.map(post => {
                                return (
                                    <div key={post._id} className="user-posts">
                                        <Link to={`/PostDetail/${post._id}`}><h1>{post.title}</h1></Link>
                                        <p>{post.description}</p>
                                        <h4>{post.price}</h4>
                                        <h3>{post.author.username}</h3>
                                        <h4>{post.location}</h4>
                                    </div>
                                )
                            })
                        ) : (
                            <h2>No User Posts Yet!</h2>
                        )}
                    </>
                </main>
                <footer className="account-footer">
                    <div id="creator-name">
                        <p>Concilla.LLC</p>
                    </div>
                    <div id="social-links">
                        <a href='https://www.instagram.com/'>
                            <img src="https://img.icons8.com/color/48/000000/instagram-new--v1.png"/>
                        </a>
                        <a href='https://www.facebook.com/'>
                            <img src="https://img.icons8.com/color/48/000000/facebook-new.png"/>
                        </a>
                        <a href='https://twitter.com/?lang=en'>
                            <img src="https://img.icons8.com/color/48/000000/twitter--v1.png"/>
                        </a>
                    </div>
                </footer>
            </div>
    )
}

export default Profile;