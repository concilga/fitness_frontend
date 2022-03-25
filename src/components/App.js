import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Login from './Login'
import Register from './Register';
import Navbar from './Navbar';
import Profile from './Profile';
import Home from './Home'
import Routines from './Routines';



const App = () => {
    const [token, setToken] = useState("");
    const [user, setUser] = useState(null)


    const fetchUser = async() => {
        const isToken = localStorage.getItem("token");
        if(isToken) {
            setToken(isToken);
        }
        const response = await fetch('http://fitnesstrac-kr.herokuapp.com/api/users/me', {
            headers: {
                Authorization: `Bearer ${isToken}`,
            },
        });
        const info = await response.json();
        
        if(info.success) {
            setUser(info.data);
        }
    }
    
    useEffect(() => {
        fetchUser();
    }, [token]);

    return (
        <>
            <Navbar token={token} setToken={setToken} 
            setUser={setUser} user={user} />

            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/Profile">
                <Profile user={user} />
            </Route>
            <Route path="/Routines">
                    <Routines  />
            </Route>
            <Route path="/Login">
                <Login token={token} setToken={setToken} />
            </Route>
            <Route path="/Register">
                <Register token={token} setToken={setToken} />
            </Route>
            {/* <Route path="/Activities">
                <Activites />
            </Route> */}
        </>
    );
}

export default App;