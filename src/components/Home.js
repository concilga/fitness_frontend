import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Link } from 'react-router-dom';

const Home = () => {

    return (
        <div className='home-page'>
            <h1 id="home-title">Welcome To Fitness Tracker</h1>
            <h1 id="logo">🏃</h1>
            <h1>All your fitness needs in one place!</h1>
        </div>
    )
}

export default Home;