import { useHistory, useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';

const Routines = () => {

  const [publicRoutines, setPublicRoutines] = useState([]);
  const [filteredRoutines, setFilteredRoutines] = useState([]);
  const [searchInput, setSearchInput] = useState("");


  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    const filteredResults = publicRoutines.filter((routines) => {
      return routines.name.includes(e.target.value);
    });
    setFilteredRoutines(filteredResults);
  };

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
    <>
      <input
        type="text"
        placeholder="Search Routines"
        onChange={handleChange}
        value={searchInput}
      />
      <button
        onClick={() => {
          setPublicRoutines(filteredRoutines);
        }}
      >
        GO!
      </button>
      <h1>Routines</h1>
      {
        publicRoutines[0] ? (
            publicRoutines.map((routine) => {
            return (
                <div key={routine.id}>
                    <h2>{routine.name}</h2>
                    <p>{routine.goal}</p>
                    <p>{routine.creatorName}</p>
                </div>
            );
            })
        ) : (
            null
        )
      }
    </>
  );
};
export default Routines;