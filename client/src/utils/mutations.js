import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;
export const ADD_PROFILE = gql`
  mutation addProfile($name: String!, $email: String!, $password: String!) {
    addProfile(name: $name, email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const ADD_FAVORITE = gql`
  mutation addFavorite($hike: Hike) {
    addFavorite(hike: $hike) {
      _id
      name
      favorite_hikes {
        _id
        name
        location {
          lat
          lng
        }
        placeId
        rating
        formatted_address
      }
    }
  }
`;

export const ADD_FUTURE = gql`
  mutation addFuture($hike: Hike) {
    addFuture(hike: $hike) {
      _id
      name
      future_hikes {
        _id
        name
        location {
          lat
          lng
        }
        placeId
        rating
        formatted_address
      }
    }
  }
`;

export const REMOVE_FAVORITE = gql`
  mutation removeFavorite($hikeId: ID!) {
    removeFavorite(hikeId: $hikeId) {
      _id
      name
      favorite_hikes {
        _id
        name
        location {
          lat
          lng
        }
        placeId
        rating
        formatted_address
      }
    }
  }
`;

export const REMOVE_FUTURE = gql`
  mutation removeFuture($hikeId: ID!) {
    removeFuture(hikeId: $hikeId) {
      _id
      name
      future_hikes {
        _id
        name
        location {
          lat
          lng
        }
        placeId
        rating
        formatted_address
      }
    }
  }
`;
