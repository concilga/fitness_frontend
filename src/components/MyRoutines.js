import { useHistory, useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Routines from "./Routines";

const MyRoutines = ({token, user, publicActivities})=> {
  if(!user){
      return (
          <></>
      )
  }

  const [publicRoutines, setPublicRoutines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [activityId, setActivityId] = useState(null);
  const history = useHistory();
  const { username } = user;
  const displayUsername = username.toUpperCase();

  async function fetchRoutines() {
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
    setPublicRoutines(info);
    }

    async function handleClick() {
      let buttonData = document.getElementById('delete-button')
      let id = buttonData.dataset.id;
      setError("");

      const response = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/routines/${id}`, {
          method: "DELETE",
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
      });
      const info = await response.json();

      if(info.error) {
          return setError(info.error);
      }

      fetchRoutines();
      history.push("/MyRoutines");
    }
    
    useEffect(() => {
        fetchRoutines();
    }, []);

    async function handleMenuClick() {
      console.log("click working", activityId);
    }

  return (
    <div className="routine-page">
    <div className="routine-header">
        <h2>{displayUsername}'s Routines</h2>
        <form className="add-form">
            <label htmlFor='title'>Search:</label>
            <input required type='text' name='searchTerm' value={searchTerm} 
                onChange={(event) => setSearchTerm(event.target.value)}/>
        </form>
        {token  ? (
            <button className="button-19">
                <Link to="/AddRoutine" id="addR-btn">Add Routine</Link>
            </button>
        ) : (
            null
        )}
    </div> 
    <h1 id="routine_cards_title">{displayUsername}'s Routines:</h1>
    <div id="cards">
      {
        publicRoutines[0] ? (
            publicRoutines.map((routine) => {
              return (
                <div key={routine.id} id="card">
                  <div id="name_section">
                    <div id="name-btn">
                      <h2 id="name">{routine.name}</h2>
                      <button id="delete-button" data-id={routine.id} onClick={handleClick}>
                        <img src="https://img.icons8.com/external-anggara-blue-anggara-putra/32/000000/external-delete-interface-anggara-blue-anggara-putra.png"/>
                      </button>
                    </div>
                    <div id="goal_section">
                      <p id="goal-title">Goal:</p>
                      <p id="goal">{routine.goal}</p>
                    </div>
                  </div>
                  <div id="activ_section">
                    <div id="activ-add">
                      <h3>Activities:</h3>
                      <div id="menu"> 
                        <select
                          defaultValue="default"
                          required
                          onChange={(e) => {setActivityId(e.target.value);}}
                        >
                          <option key="default" value="default" disabled>
                            Add an Activity
                          </option>
                          {publicActivities.map((activity) => {
                            return (
                              <option key={activity.id} value={activity.id}>
                                {activity.name}
                              </option>
                            );
                          })}
                        </select>
                        <button onClick={handleMenuClick}>
                          Add
                        </button>
                      </div>
                    </div>
                    {routine.activities[0] ? (
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
                              <button>Update</button>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div id="miss-activ">
                        <img src="/images/No-Activities-Art.png" alt=""/>
                      </div>
                    )}  
                  </div>
                  <div id="creator">
                    <p>Creator: {routine.creatorName}</p>
                    <button>
                      <Link to={`/EditRoutine/${routine.id}`}>Edit</Link>
                    </button>
                  </div>
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