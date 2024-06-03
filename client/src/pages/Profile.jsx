import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import FutureForm from "../components/FutureForm";
import FavoriteForm from "../components/FavoriteForm";

import { QUERY_SINGLE_PROFILE, QUERY_ME } from "../utils/queries";

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile?.name) {
    return (
      <h5 className="goLogin mt-5">
        You need to be logged in to see your profile page. <br /> Use the navigation
        links above to sign up or log in!
      </h5>
    );
  }

  return (
    <div>
      <h2 className="card-header mt-4">
        <b><i>Favorite Hikes</i></b>
      </h2>
      {profile.favorite_hikes?.length > 0 && (
        <FavoriteForm
          favorite_hikes={profile.favorite_hikes}
          profileId={profile._id}
        />
      )}

      <h2 className="card-header mt-4">
        <b><i>Future Hikes</i></b>
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

// {profileId ? `${profile.name}'s` : "Your"}