import { useHistory, useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';

const Routines = ({token, publicRoutines}) => {
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

  return (
    <div className="routine-page">
    <div className="routine-header">
        <h2>Routines</h2>
        <form className="add-form">
            <label htmlFor='title'>Search:</label>
            <input required type='text' name='searchTerm' value={searchTerm} 
                onChange={(event) => setSearchTerm(event.target.value)}/>
        </form>
        {token  ? (
            <button id="add-post-btn">
                <Link to="/AddRoutine">Add Routine</Link>
            </button>
        ) : (
            null
        )}
    </div> 
    <h1 id="routine_cards_title">Routines:</h1>
    <div id="cards">
      {
        publicRoutines[0] ? (
            routinesToDisplay.map((routine) => {
            return (
                <div key={routine.id} id="card">
                  <div id="name_section">
                    <h2 id="name">{routine.name}</h2>
                    <div id="goal_section">
                      <p id="goal-title">Goal:</p>
                      <p id="goal">{routine.goal}</p>
                    </div>
                  </div>
                  <div id="activ_section">
                    <h3>Activities:</h3>
                    <div id="activ_cards">
                      {routine.activities.map((activity) => {
                        return (
                          <div key={activity.id} id="activ_card">
                            <div id="activ-head">
                              <p id="activities">Activity: {activity.name}</p>
                              <button>
                                <img src="https://img.icons8.com/external-anggara-blue-anggara-putra/32/000000/external-delete-interface-anggara-blue-anggara-putra.png"/>
                              </button>
                            </div>
                            <p id="description">Description: {activity.description}</p>
                            <p id="count">Count: {activity.count}</p>
                            <p id="duration">Duration: {activity.duration}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
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