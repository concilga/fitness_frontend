import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Link, useHistory } from 'react-router-dom';

const AddRoutine = ({token, setPublicRoutines, user}) => {
    const [name, setName] = useState('');
    const [goal, setGoal] = useState('');
    const [error, setError] = useState('');

    const history = useHistory();

    async function fetchRoutines() {
        const response = await fetch("http://fitnesstrac-kr.herokuapp.com/api/routines");
        const info = await response.json();
        setPublicRoutines(info);
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        setError("");

        const response = await fetch('http://fitnesstrac-kr.herokuapp.com/api/routines', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(
                {
                    creatorId: user.id,
                    isPublic: true,
                    name,
                    goal
                }
            )
        });
        const info = await response.json();

        if(info.error) {
            return setError(info.error.message);
        }

        fetchRoutines();
        
        history.push("/Routines");

    }



    return (
        <div id='addPost-container'>
            <div id='addPost-title'>
                <h2>Please Fill Out the Information Below to Create a New Post!</h2>
            </div>
            <form className="addPost-form" onSubmit={handleSubmit}>
              <label htmlFor='name'>Name:</label>
              <input required type='text' name='name' value={name} 
                onChange={(event) => setName(event.target.value)}/>
              <label htmlFor='goal'>Goal:</label>
              <input required type='goal' name='goal' value={goal} 
                onChange={(event) => setGoal(event.target.value)}/>
              <button type='submit'>Submit</button>
            </form>
            <p>{error}</p>
      </div>
    )
}

export default AddRoutine;