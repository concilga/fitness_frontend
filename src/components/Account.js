import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Link } from 'react-router-dom';

const Account = ({user}) => {
    if(!user){
        return (
            <></>
        )
    }
    
    const existingPosts = user.posts.filter(
        (post) => post.active == true
    );

    const sentMessages = user.messages.filter(
        (message) => message.fromUser.username === user.username
    );

    const recievedMessages = user.messages.filter(
        (message) => message.fromUser.username !== user.username
    );
    
    return(
            <div className="account-page">
                <header className="account-header">
                    <div className="account-functions">
                        <img id="profile-pic" src="https://img.icons8.com/bubbles/100/000000/test-account.png"/>
                        <h1>{user.username}</h1>
                    </div>
                    <div>
                        <h1 id="logo-account">🍊</h1>
                        <h1>Stanger's Things</h1>
                    </div>
                </header>
                <main className="account-body">
                    <h1 id="user-post-title">Your Post's!!</h1>
                    <>
                        {user ? (
                            existingPosts.map(post => {
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
                    <h1 id="user-post-title">Your Messages!</h1>
                    <>
                        <h2 id="messages-title">Recived Messages:</h2>
                        {recievedMessages[0] ? (
                            recievedMessages.map(message => {
                                return (
                                    <div key={message._id} className="user-messages">
                                        <Link to={`/PostDetail/${message.post}`}><h1>{message.post.title}</h1></Link>
                                        <h3>{message.content}</h3>
                                        <h4>{message.fromUser.username}</h4>
                                    </div>
                                )
                            })
                        ) : (
                            <h2>No Messages Yet!</h2>
                        )}
                    </>
                    <>
                        <h2 id="messages-title">Sent Messages:</h2>
                        {sentMessages[0] ? (
                            sentMessages.map(message => {
                                return (
                                    <div key={message._id} className="user-messages">
                                        <Link to={`/PostDetail/${message.post}`}><h1>{message.post.title}</h1></Link>
                                        <h3>{message.content}</h3>
                                        <h4>{message.fromUser.username}</h4>
                                    </div>
                                )
                            })
                        ) : (
                            <h2>No Sent Messages Yet!</h2>
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

export default Account;