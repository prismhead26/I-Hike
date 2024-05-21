import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { REMOVE_FAVORITE, REMOVE_FAVORITE } from '../../utils/mutations';

import Auth from '../../utils/auth';

// need to refactor this to be a favorite form as shown in the Profile.jsx
const FavoriteForm = ({ favorite_hikes, profileId }) => {

  const [removeFavorite, { error }] = useMutation(REMOVE_FAVORITE);


  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await removeFavorite({
        variables: { hikeId },
      });

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
          <div className="col-12 col-lg-9">
            <input
              placeholder="Endorse some skills..."
              value={skill}
              className="form-input w-100"
              onChange={(event) => setSkill(event.target.value)}
            />
          </div>

          <div className="col-12 col-lg-3">
            <button className="btn btn-info btn-block py-3" type="submit">
              Endorse Skill
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
          You need to be logged in to endorse skills. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default SkillForm;
