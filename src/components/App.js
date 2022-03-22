import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Posts from './Posts'
import Login from './Login'
import Navbar from './Navbar';
import Register from './Register';
import Home from './Home';
import Account from './Account';
import AddPost from './AddPost';
import PostDetail from './PostDetail';
import EditPost from './EditPost';

const App = () => {
    const [postResults, setPostResults] = useState([]);
    const [token, setToken] = useState("");
    const [user, setUser] = useState(null)

    async function fetchPosts() {
        let headers = {};
        if(token) {
            headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        } else {
            headers = {
                "Content-Type": "application/json"
            }
        }
        const response = await fetch('https://strangers-things.herokuapp.com/api/2110-FTB-ET-WEB-PT/posts', {
            method: "GET",
            headers
        });
        const info = await response.json();
        setPostResults(info.data);
    }

    const fetchUser = async() => {
        const isToken = localStorage.getItem("token");
        if(isToken) {
            setToken(isToken);
        }
        const response = await fetch('https://strangers-things.herokuapp.com/api/2110-FTB-ET-WEB-PT/users/me', {
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
        fetchPosts();
    }, [token]);

    return (
        <>
            <Navbar token={token} setToken={setToken} 
            setUser={setUser} user={user} />

            <Route exact path="/">
                <Home user={user}/>
            </Route>
            <Route path="/Account">
                <Account user={user} />
            </Route>
            <Route path="/Posts">
                    <Posts postResults={postResults} token={token} />
            </Route>
            <Route path="/Login">
                <Login token={token} setToken={setToken} />
            </Route>
            <Route path="/Register">
                <Register token={token} setToken={setToken} />
            </Route>
            <Route path="/AddPost">
                <AddPost setPostResults={setPostResults} token={token}/>
            </Route>
            <Route path="/PostDetail/:id">
                <PostDetail user={user} token={token} postResults={postResults} setPostResults={setPostResults} />
            </Route>
            <Route path="/EditPost/:id">
                <EditPost postResults={postResults} setPostResults={setPostResults} token={token}/>
            </Route>
        </>
    );
}

export default App;