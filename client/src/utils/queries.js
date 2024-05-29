import { gql } from "@apollo/client";

export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
      _id
      name
      favorite_hikes {
        _id
        name
        placeId
      }
      future_hikes {
        _id
        name
        placeId
      }
    }
  }
`;

export const QUERY_SINGLE_PROFILE = gql`
  query singleProfile($profileId: ID!) {
    profile(profileId: $profileId) {
      _id
      name
      favorite_hikes {
        _id
        name
        placeId
      }
      future_hikes {
        _id
        name
        placeId
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      favorite_hikes {
        _id
        name
        placeId
      }
      future_hikes {
        _id
        name
        placeId
      }
    }
  }
`;

//
export const QUERY_HIKES = gql`
  query allHikes {
    hikes {
      _id
      name
      location {
        lat
        lng
      }
      rating
      formatted_address
    }
  }
`;

export const QUERY_SINGLE_HIKE = gql`
  query singleHike($hikeId: ID!) {
    hike(hikeId: $hikeId) {
      _id
      name
      location {
        lat
        lng
      }
      rating
      formatted_address
    }
  }
`;
