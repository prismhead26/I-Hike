const { Profile } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    profiles: async () => {
      return Profile.find()
        .populate({ path: "favorite_hikes" })
        .populate({ path: "future_hikes" });
    },

    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId })
        .populate({ path: "favorite_hikes" })
        .populate({ path: "future_hikes" });
    },
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOne({ _id: context.user._id })
          .populate({ path: "favorite_hikes" })
          .populate({ path: "future_hikes" });
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    addProfile: async (parent, { name, email, password }) => {
      const profile = await Profile.create({ name, email, password });
      const token = signToken(profile);

      return { token, profile };
    },
    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });

      if (!profile) {
        throw AuthenticationError;
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(profile);
      return { token, profile };
    },

    // Add a third argument to the resolver to access data in our `context`
    addFavorite: async (parent, { hikeId }, context) => {
      if (context.user) {
        return Profile.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: { favorite_hikes: hikeId },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    },
    // Set up mutation so a logged in user can only remove their profile and no one else's
    removeProfile: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOneAndDelete({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
    // Make it so a logged in user can only remove a skill from their own profile
    removeFavorite: async (parent, { hikeId }, context) => {
      if (context.user) {
        return Profile.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { favorite_hikes: hikeId } },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
    addFuture: async (parent, { hikeId }, context) => {
      if (context.user) {
        return Profile.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: { future_hikes: hikeId },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    },
    removeFuture: async (parent, { hikeId }, context) => {
      if (context.user) {
        return Profile.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { future_hikes: hikeId } },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
