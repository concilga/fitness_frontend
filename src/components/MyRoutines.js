import { useHistory, useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Routines from "./Routines";

const MyRoutines = ({token, user})=> {
    if(!user){
        return (
            <></>
        )
    }

  const [publicRoutines, setPublicRoutines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { username } = user;

  async function fetchRoutines() {
    console.log(user);
    const response = await fetch(
      `http://fitnesstrac-kr.herokuapp.com/api/users/${username}/routines`,
      {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
      }
    );
    const info = await response.json();
    console.log(info)
    setPublicRoutines(info);
    }
    
    useEffect(() => {
        fetchRoutines();
    }, []);
  return (
    <div className="routine-page">
    <div className="routine-header">
        <h2>My Routines</h2>
        <form className="add-form">
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
      <h1 id="routine_cards_title">My Routines</h1>
      {
        publicRoutines[0] ? (
            publicRoutines.map((routine) => {
            return (
                <div key={routine.id} id="card">
                    <h2 id="name">{routine.name}</h2>
                    <p id="goal">Goal: {routine.goal}</p>
                    {routine.activities.map((activity) => {
                    return (
                      <div key={activity.id} id="activitiescard">
                        <p id="activities">Activities: {activity.name}</p>
                        <p id="description">
                          Description: {activity.description}
                        </p>
                        <p id="count">Count: {activity.count}</p>
                        <p id="duration">Duration: {activity.duration}</p>
                      </div>
                    );
                  })}
                    <p id="creator">Creator: {routine.creatorName}</p>
                </div>
            );
            })
        ) : (
            <h1>You Have Not Created Any Routines Yet!</h1>
        )
      }
    </div>
    </div>
  );
};
export default MyRoutines;