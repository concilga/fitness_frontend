import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Link } from 'react-router-dom';

const Navbar = ({token, setToken, setUser, user}) => {

    return (
        <>{token ? (
            <div id="main-navbar">
                <Link id="icon" to="/"><i className="material-icons">home</i></Link> 
                <Link id="icon" to="/Posts"><i className="material-icons">collections_bookmark</i></Link>
                <Link id="icon" to="/Account">
                    <i className="material-icons">account_circle</i>
                </Link>
                <Link
                    id="icon"
                    to="/"
                    onClick={() => {
                        setToken("");
                        setUser({});
                        localStorage.removeItem("token")
                    }}
                ><i className="material-icons">logout</i></Link>
            </div>
            ) : (
            <div id="main-navbar">
                <Link id="icon" to="/"><i className="material-icons">home</i></Link> 
                <Link id="icon" to="/Posts"><i className="material-icons">collections_bookmark</i></Link> 
                <Link id="icon" to="/Login"><i className="material-icons">login</i></Link>
            </div>
        )}</>
    );
}

export default Navbar;