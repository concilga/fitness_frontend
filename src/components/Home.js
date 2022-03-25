import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Link } from 'react-router-dom';

const Home = () => {

    return (
        <div className='home-page'>
            <h1 id="home-title">Welcome To Fitness Tracker</h1>
            <h1 id="logo">🏃</h1>
            <h2>All your fitness needs in one place</h2>
            <h2>Please enjoy, we are very happy for your interest!</h2>
        </div>
    )
}

export default Home;