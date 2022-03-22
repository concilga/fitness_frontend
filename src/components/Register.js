import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Link, useHistory } from 'react-router-dom';

const Register = ({setToken}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('')

    const history = useHistory();
  
    const handleChange = (event) => {
      setUsername(event.target.value);
    }

    const  handleRegister = async(event) => {
        event.preventDefault();
        setError("");

        if(password !== confirmPassword) {
            setError("Your password do not match!")
            return;
        }

        const response = await fetch('https://strangers-things.herokuapp.com/api/2110-FTB-ET-WEB-PT/users/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user: {
                    username,
                    password,
                },
            }),
        });
        const info = await response.json();

        if(info.error) {
            return setError(info.error.message)
        }

        setToken(info.data.token);
        localStorage.setItem("token", info.data.token);

        history.push("/");
    }
  
    const handleSubmit = (event) => {
      event.preventDefault();
      handleRegister(event);
      setUsername('');
      setPassword('');
      setConfirmPassword('');
    }
  
    return (
      <div id='container'>
        <div id='login-navbar'>
          Register:
        </div>
            <form className="login-form" onSubmit={handleSubmit}>
              <label htmlFor='username'>Username:</label>
              <input required type='text' name='username' value={username} onChange={handleChange} />
              <label htmlFor='password'>Password:</label>
              <input required type='password' name='password' value={password} onChange={(event) => setPassword(event.target.value)} />
              <label htmlFor='confirm_password'>Confirm Password:</label>
              <input required type='password' name='confirm_password' value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
              <button type='submit'>Submit</button>
            </form>
            <p>{error}</p>
      </div>
    )

}


export default Register; 