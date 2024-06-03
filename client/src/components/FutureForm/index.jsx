import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

import { REMOVE_FUTURE } from "../../utils/mutations";
import Auth from "../../utils/auth";

const FutureForm = ({ future_hikes }) => {
  const [selectedHikeId, setSelectedHikeId] = useState("");
  const [removeFuture, { error }] = useMutation(REMOVE_FUTURE);

  const handleFormSubmit = async (event) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) return false;

    event.preventDefault();
    try {
      await removeFuture({
        variables: { hikeId: selectedHikeId }, // Pass the selected hike ID to the mutation
      });
      window.location.reload();
      // Handle mutation response if needed
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {Auth.loggedIn() ? (
        <form
          className="flex-row justify-center justify-space-between-md align-center myHikesContainer mt-3"
          onSubmit={handleFormSubmit}
        >
          {/* map through the future_hikes array and list each hike by name as a Link and pass in placeId as to={pathname: `/trail/${hike.placeId}`} and state: {trail: hike} */}
          <div className="container">
            {future_hikes.map((hike) => (
              <ul key={hike._id} className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <Link
                    className="trailLink"
                    to={`/trail/${hike.placeId}`}
                    key={hike._id}
                    state={{ trail: hike }}
                  >
                    {hike.name}
                  </Link>
                  <button
                    className="btn  py-2"
                    type="submit"
                    onClick={() => setSelectedHikeId(hike._id)}
                  >
                    <FontAwesomeIcon icon={faTrashCan} size="1x" />
                  </button>
                </li>
              </ul>
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
          You need to be logged in to manage future hikes. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default FutureForm;
