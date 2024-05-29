import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { REMOVE_FUTURE } from "../../utils/mutations";

import Auth from "../../utils/auth";

const FutureForm = ({ future_hikes }) => {
  const [selectedHikeId, setSelectedHikeId] = useState("");
  const [removeFuture, { error }] = useMutation(REMOVE_FUTURE);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await removeFuture({
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
          {/* map through the future_hikes array and list each hike by name as a Link and pas in placeId as to={pathname: `/trail/${hike.placeId}`} and state: {trail: hike} */}
          <div className="col-12 col-lg-3">
            {future_hikes.map((hike) => (
              <Link
                to={`/trail/${hike.placeId}`}
                key={hike._id}
                state={{ trail: hike }}
              >
                {hike.name}
              </Link>
            ))}
          </div>

          <div className="col-12 col-lg-3">
            <button className="btn btn-info btn-block py-3" type="submit">
              Remove Future Hike
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
          You need to be logged in to manage future hikes. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default FutureForm;
