import { useHistory, useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';

const Routines = (token) => {

  const [publicRoutines, setPublicRoutines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  function routineMatches(routine, text) {  
      if (routine.name.toLowerCase().includes(text) || routine.goal.toLowerCase().includes(text) ||
          (routine.creatorName.toLowerCase().includes(text))
      ){
          return true;
      } else {
          return false;
      }
  }

  const filteredRoutines = publicRoutines.filter(routine => routineMatches(routine, searchTerm));
  const routinesToDisplay = searchTerm.length ? filteredRoutines : publicRoutines;

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
    console.log(info, "info");
    setPublicRoutines(info);
  }



    useEffect(() => {
        fetchRoutines();
    }, []);

  return (
    <div className="routine-page">
    <div className="routine-header">
        <h2>Routines</h2>
        <form className="add-post-form">
            <label htmlFor='title'>Search:</label>
            <input required type='text' name='searchTerm' value={searchTerm} 
                onChange={(event) => setSearchTerm(event.target.value)}/>
        </form>
        {token  ? (
            <button id="add-post-btn">
                <Link to="/AddPost">Add Routine</Link>
            </button>
        ) : (
            null
        )}
    </div> 
    <div id="cards">
      <h1 id="routine_cards_title">Routines</h1>
      {
        publicRoutines[0] ? (
            routinesToDisplay.map((routine) => {
            return (
                <div key={routine.id} id="card">
                    <h2 id="name">{routine.name}</h2>
                    <p id="goal">Description: {routine.goal}</p>
                    <p id="creator">Creator: {routine.creatorName}</p>
                </div>
            );
            })
        ) : (
            null
        )
      }
    </div>
    </div>
  );
};
export default Routines;