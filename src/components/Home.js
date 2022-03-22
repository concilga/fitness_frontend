import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Link } from 'react-router-dom';

const Home = ({user}) => {
    console.log(user);

    return (
        <div className='home-page'>
            <h1 id="home-title">Welcome To Stanger's Things {user ? user.username : null}</h1>
            <h1 id="logo">🍊</h1>
            <h2>Our Website is just like craigslist but better.</h2>
            <h2>Please enjoy, we are very happy for your interest!</h2>
        </div>
    )
}

export default Home;