import { useHistory, useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Activities = (token) => {
  const [publicActivities, setPublicActivities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  function activityMatches(activity, text) {  
    if (activity.name.toLowerCase().includes(text) || activity.description.toLowerCase().includes(text)
    ){
        return true;
    } else {
        return false;
    }
    }

  const filteredActivities = publicActivities.filter(activity => activityMatches(activity, searchTerm));
  const activitiesToDisplay = searchTerm.length ? filteredActivities : publicActivities;

  async function fetchActivities() {
    const response = await fetch(
      "http://fitnesstrac-kr.herokuapp.com/api/activities",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
        );
        const activityList = await response.json();
        setPublicActivities(activityList);
    }

//   async function createActivity() {
//       const response = await fetch('http://fitnesstrac-kr.herokuapp.com/api/activities', {
//         method: "POST",
//         body: JSON.stringify({
//           name,
//           description
//         })
//       });
//     const newActivity = await response.json();
//     console.log(newActivity, "New Activity");
//     setPublicActivities(newActivity);
//   }
  useEffect(() => {
    fetchActivities();
  }, []);

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
        <button id="add-post-btn">
          <Link to="/AddPost">Add Activity</Link>
        </button>
      ) : null}
    </div>
      <div id="cards">
        <h1 id="routine_cards_title">Activities</h1>
        {publicActivities[0]
          ? activitiesToDisplay.map((activity) => {
              console.log(activity)
              return (
                <div key={activity.id} id="card">
                  <h2 id="name">{activity.name}</h2>
                  <p id="description">Description: {activity.description}</p>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};
export default Activities;
