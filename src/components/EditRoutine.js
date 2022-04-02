import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Link, useParams, useHistory } from 'react-router-dom';

const EditRoutine = ({token, user, setPublicRoutines, publicRoutines}) => {
    if(!user){
        return (
            <></>
        )
    }

    const {id} = useParams()

    const [name, setName] = useState('');
    const [goal, setGoal] = useState('');
    const [error, setError] = useState('');

    const history = useHistory();
    
    const setTemplate = () => {
        fetchRoutines();

        const individualRoutine = publicRoutines.filter(
            (routine) => routine.id == id
        );

        setName(individualRoutine[0].name);
        setGoal(individualRoutine[0].goal);
    }

    useEffect(() => {
        setTemplate();
    }, []);

    async function fetchRoutines() {
        const response = await fetch("http://fitnesstrac-kr.herokuapp.com/api/routines");
        const info = await response.json();
        setPublicRoutines(info);
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        setError("");

        const response = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/routines/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                    name,
                    goal,
                    isPublic: true
            })
        });
        const info = await response.json();

        if(info.error) {
            return setError(info.error);
        }

        fetchRoutines();
        
        history.push(`/MyRoutines`);
    }



    return (
        <div id='addPost-container'>
            <div id='addPost-title'>
                <h2>Please Edit the Information Below and Submit:</h2>
            </div>
            <form className="addPost-form" onSubmit={handleSubmit}>
              <label htmlFor='name'>Name of Routine:</label>
              <input required type='text' name='name' value={name} 
                onChange={(event) => setName(event.target.value)}/>
              <label htmlFor='goal'>Description:</label>
              <input required type='goal' name='goal' value={goal} 
                onChange={(event) => setGoal(event.target.value)}/>
              <button type='submit'>Submit</button>
            </form>
            <p>{error}</p>
      </div>
    )
}

export default EditRoutine;