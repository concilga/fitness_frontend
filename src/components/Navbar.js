import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Link } from 'react-router-dom';

const Navbar = ({token, setToken, setUser}) => {
    const body = document.body;
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if(currentScroll <= 0) {
            body.classList.remove("scroll-up")
        }

        if(currentScroll > lastScroll && !body.classList.contains("scroll-down")) {
            body.classList.remove("scroll-up");
            body.classList.add("scroll-down");
        }

        if(currentScroll < lastScroll && body.classList.contains("scroll-down")) {
            body.classList.remove("scroll-down");
            body.classList.add("scroll-up");
        }


    lastScroll = currentScroll;
})

    return (
        <>{token ? (
            <div id="main-navbar">
                <Link id="icon" to="/">Home</Link> 
                <Link id="icon" to="/Routines">Routines</Link>
                <Link id="icon" to="/Activities">Activities</Link>
                <Link id="icon" to="/MyRoutines">My Routines</Link>
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
                <Link id="icon" to="/Activities">Activities</Link>
                <Link id="icon" to="/Login">Login</Link>
            </div>
        )}</>
    );
}

export default Navbar;