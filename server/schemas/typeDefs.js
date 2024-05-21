const typeDefs = `
  type Profile {
    _id: ID
    name: String
    email: String
    password: String
    favorite_hikes: [Hike]
    future_hikes: [Hike]
  }
  
  type Hike {
    _id: ID
    name: String
    location: String
    distance: Float
    difficulty: String
    description: String
    image: String
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    me: Profile
  }

  type Mutation {
    addProfile(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    removeProfile: Profile
    addFavorite(hikeId: ID!): Profile
    removeFavorite(hikeId: ID!): Profile
    addFuture(hikeId: ID!): Profile
    removeFuture(hikeId: ID!): Profile
  }
`;

module.exports = typeDefs;