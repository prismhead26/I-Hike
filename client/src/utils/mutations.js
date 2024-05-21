import { gql } from '@apollo/client';

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

export const ADD_FAVORITE = gql`
  mutation addFavorite($hikeId: ID!) {
    addFavorite(hikeId: $hikeId) {
      _id
      name
      favorite_hikes {
        _id
        name
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
      }
    }
  }
`;

export const ADD_FUTURE = gql`
  mutation addFuture($hikeId: ID!) {
    addFuture(hikeId: $hikeId) {
      _id
      name
      future_hikes {
        _id
        name
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
      }
    }
  }
`;
