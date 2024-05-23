import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { REMOVE_FAVORITE } from "../../utils/mutations";

import Auth from "../../utils/auth";

const FavoriteForm = ({ favorite_hikes }) => {
  const favHikes = favorite_hikes;
  console.log("fav hike obj", favHikes);
  const [selectedHikeId, setSelectedHikeId] = useState("");
  const [removeFavorite, { error }] = useMutation(REMOVE_FAVORITE);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("hike id........", selectedHikeId);
      await removeFavorite({
        variables: { hikeId: favHikes[0]._id }, // Pass the selected hike ID to the mutation
      });
      // Handle mutation response if needed
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h4>My Hikes</h4>

      {Auth.loggedIn() ? (
        <form
          className="flex-row justify-center justify-space-between-md align-center"
          onSubmit={handleFormSubmit}
        >
          {/* Display the favorite hikes and provide a way to select one */}
          <select
            value={selectedHikeId}
            onChange={(event) => {
              console.log("hike id", selectedHikeId);
              setSelectedHikeId(event.target.value);
            }}
          >
            {favorite_hikes.map((hike) => (
              <option key={hike} value={hike.id}>
                {hike.name}
              </option>
            ))}
          </select>

          <div className="col-12 col-lg-3">
            <button className="btn btn-info btn-block py-3" type="submit">
              Remove Favorite
            </button>
          </div>
          {error && (
            <div className="col-12 my-3 bg-danger text-white p-3">
              {error.message}
            </div>
          )}
        </form>
      ) : (
        <p>
          You need to be logged in to manage favorite hikes. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default FavoriteForm;
