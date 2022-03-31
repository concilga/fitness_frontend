import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Login from './Login'
import Register from './Register';
import Navbar from './Navbar';
import MyRoutines from './MyRoutines';
import Home from './Home'
import Routines from './Routines';
import Activities from './Activities';
import AddRoutine from './AddRoutine';



const App = () => {
    const [token, setToken] = useState("");
    const [user, setUser] = useState(null)
    const [publicRoutines, setPublicRoutines] = useState([]);

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
        
        if(info.id) {
            setUser(info);
        }
    }

    async function fetchRoutines() {
        const response = await fetch(
          "http://fitnesstrac-kr.herokuapp.com/api/routines",
          {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
          }
        );
        const info = await response.json();
        setPublicRoutines(info);
    }
    
    useEffect(() => {
        fetchUser();
        fetchRoutines();
    }, [token]);

    return (
        <>
            <Navbar token={token} setToken={setToken} 
            setUser={setUser} user={user} />

            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/MyRoutines">
                <MyRoutines user={user} token={token} />
            </Route>
            <Route path="/Routines">
                    <Routines publicRoutines={publicRoutines} token={token} />
            </Route>
            <Route path="/Login">
                <Login token={token} setToken={setToken} />
            </Route>
            <Route path="/Register">
                <Register token={token} setToken={setToken} />
            </Route>
            <Route path="/Activities">
                <Activities token={token} />
            </Route>
            <Route path="/AddRoutine">
                <AddRoutine setPublicRoutines={setPublicRoutines} token={token} user={user} />
            </Route>
        </>
    );
}

export default App;