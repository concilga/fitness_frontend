import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Link } from 'react-router-dom';

const Navbar = ({token, setToken, setUser}) => {

    return (
        <>{token ? (
            <div id="main-navbar">
                <Link id="icon" to="/">Home</Link> 
                <Link id="icon" to="/Routines">Routines</Link>
                <Link id="icon" to="/">Activites</Link>
                <Link id="icon" to="/Profile">Profile</Link>
                <Link
                    id="icon"
                    to="/"
                    onClick={() => {
                        setToken("");
                        setUser({});
                        localStorage.removeItem("token")
                    }}
                >Logout</Link>
            </div>
            ) : (
            <div id="main-navbar">
                <Link id="icon" to="/">Home</Link> 
                <Link id="icon" to="/Routines">Routines</Link> 
                <Link id="icon" to="/Login">Login</Link>
            </div>
        )}</>
    );
}

export default Navbar;