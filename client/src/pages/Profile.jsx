import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import FutureForm from "../components/FutureForm";
import FavoriteForm from "../components/FavoriteForm";

import { QUERY_SINGLE_PROFILE, QUERY_ME } from "../utils/queries";

// import Auth from "../utils/auth";

const Profile = () => {
  const { profileId } = useParams();

  // If there is no `profileId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { loading, data } = useQuery(
    profileId ? QUERY_SINGLE_PROFILE : QUERY_ME,
    {
      variables: { profileId: profileId },
    }
  );

  // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_PROFILE` query
  const profile = data?.me || data?.profile || {};

  // Use React Router's `<Redirect />` component to redirect to personal profile page if username is yours
  // if (Auth.loggedIn() && Auth.getProfile().data._id === profileId) {
  //   return <Navigate to="/me" />;
  // }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile?.name) {
    return (
      <h4>
        You need to be logged in to see your profile page. Use the navigation
        links above to sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <h2 className="card-header">
        {profileId ? `${profile.name}'s` : "Your"} favorite hikes...
      </h2>
      {profile.favorite_hikes?.length > 0 && (
        <FavoriteForm
          favorite_hikes={profile.favorite_hikes}
          profileId={profile._id}
        />
      )}

      <h2 className="card-header">
        {profileId ? `${profile.name}'s` : "Your"} future hikes...
      </h2>

      {profile.future_hikes?.length > 0 && (
        <FutureForm
          future_hikes={profile.future_hikes}
          profileId={profile._id}
        />
      )}
    </div>
  );
};

export default Profile;
