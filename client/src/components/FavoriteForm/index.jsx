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
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) return false;

    event.preventDefault();
    try {
      console.log("hike id........", selectedHikeId);
      await removeFavorite({
        variables: { hikeId: selectedHikeId }, // Pass the selected hike ID to the mutation
      });
      // Handle mutation response if needed
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {Auth.loggedIn() ? (
        <form
          className="flex-row justify-center justify-space-between-md align-center"
          onSubmit={handleFormSubmit}
        >
          {/* map through the favorite_hikes array and list each hike by name as a Link and pas in placeId as to={pathname: `/trail/${hike.placeId}`} and state: {trail: hike} */}
          <div className="col-12 col-lg-3">
            {favorite_hikes.map((hike) => (
              <div key={hike._id}>
                <Link
                  to={`/trail/${hike.placeId}`}
                  key={hike._id}
                  state={{ trail: hike }}
                >
                  {hike.name}
                </Link>
                <div className="col-12 col-lg-3">
                  <button
                    className="btn btn-info btn-block py-3"
                    type="submit"
                    onClick={() => setSelectedHikeId(hike._id)}
                  >
                    Remove Favorite
                  </button>
                </div>
              </div>
            ))}
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
