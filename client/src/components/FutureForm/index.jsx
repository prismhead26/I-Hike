import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { REMOVE_FUTURE } from "../../utils/mutations";

import Auth from "../../utils/auth";

const FutureForm = ({ future_hikes }) => {
  const [selectedHikeId, setSelectedHikeId] = useState("");
  const [removeFuture, { error }] = useMutation(REMOVE_FUTURE);

  console.log("future hike obj", future_hikes);
  console.log("selectedHikeId", selectedHikeId);

  const handleFormSubmit = async (event) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) return false;

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
          <div className="container fluid">
            {future_hikes.map((hike) => (
              <div key={hike._id}>
                <div className="col-12">
                  <Link
                    to={`/trail/${hike.placeId}`}
                    key={hike._id}
                    state={{ trail: hike }}
                  >
                    {hike.name}
                  </Link>
                </div>
                <div className="col-12 col-lg-3">
                  <button
                    className="btn btn-info btn-block py-3"
                    type="submit"
                    value={hike._id}
                    // on click set the selectedHikeId to the new object hike._id
                    // onClick={(event) => setSelectedHikeId(event.target.value)}
                    onClick={() => setSelectedHikeId(hike._id)}
                  >
                    Remove Future Hike
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
          You need to be logged in to manage future hikes. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default FutureForm;
