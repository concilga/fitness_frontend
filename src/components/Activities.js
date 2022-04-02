import { useHistory, useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
const Activities = ({ token, publicActivities }) => {
  const [searchTerm, setSearchTerm] = useState("");
  function activityMatches(activity, text) {
    if (
      activity.name.toLowerCase().includes(text) ||
      activity.description.toLowerCase().includes(text)
    ) {
      return true;
    } else {
      return false;
    }
  }
  const filteredActivities = publicActivities.filter((activity) =>
    activityMatches(activity, searchTerm)
  );
  const activitiesToDisplay = searchTerm.length
    ? filteredActivities
    : publicActivities;
  useEffect(() => {}, []);
  return (
    <div className="routine-page">
      <div className="routine-header">
        <h2>Activities</h2>
        <form className="add-activity-post-form">
          <label htmlFor="title">Search:</label>
          <input
            required
            type="text"
            name="searchTerm"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </form>
        {token ? (
          <button className="button-19">
            <Link to="/AddActivity" id="addR-btn">Add Activity</Link>
          </button>
        ) : null}
      </div>
      <h1 id="routine_cards_title">Activities:</h1>
      <div id="cards">
        {publicActivities[0]
          ? activitiesToDisplay.map((activity) => {
              return (
                <div key={activity.id} id="card">
                  <div id="name_section">
                    <h2 id="name">{activity.name}</h2>
                    <div id="goal_section">
                      <p id="goal-title">Description:</p>
                      <p id="goal">{activity.description}</p>
                    </div>
                  </div>
                  <div id="activ_section">
                    <h3>Associated Routines:</h3>
                    <div id="activ_cards">
                      {/* {routine.activities.map((activity) => {
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
                      })} */}
                    </div>
                  </div>
                  <p id="creator">Fitness+ llc</p>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Activities;