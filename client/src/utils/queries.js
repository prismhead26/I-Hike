import { gql } from '@apollo/client';

export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
      _id
      name
      favorite_hikes {
        _id
        name
      }
      future_hikes {
        _id
        name
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
      }
      future_hikes {
        _id
        name
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
      }
      future_hikes {
        _id
        name
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
      location
      distance
      difficulty
      description
      image
    }
  }
`;

export const QUERY_SINGLE_HIKE = gql`
  query singleHike($hikeId: ID!) {
    hike(hikeId: $hikeId) {
      _id
      name
      location
      distance
      difficulty
      description
      image
    }
  }
`;
