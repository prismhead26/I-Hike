const db = require("../config/connection");
const { Profile, Hike } = require("../models");
const cleanDB = require("./cleanDB");
const profileSeeds = require("./profileSeeds.json");
const hikeSeeds = require("./hikeSeeds.json");

const init = () => {
  db.once("open", async () => {
    try {
      await cleanDB("profiles");
      await cleanDB("hikes");
      const hikes = await Hike.insertMany(hikeSeeds);
      const profiles = await Profile.create(profileSeeds);
      for (let i = 0; i < profiles.length; i++) {
        await Profile.findOneAndUpdate(
          {
            _id: profiles[i]._id,
          },
          {
            $addToSet: {
              favorite_hikes:
                hikes[Math.floor(Math.random() * hikes.length)]._id,
            },
          },
          { new: true, runValidators: true }
        );
        await Profile.findOneAndUpdate(
          {
            _id: profiles[i]._id,
          },
          {
            $addToSet: {
              future_hikes: hikes[Math.floor(Math.random() * hikes.length)]._id,
            },
          },
          { new: true, runValidators: true }
        );
      }
      console.log("all done!");
      process.exit(0);
    } catch (err) {
      console.log(err);
      throw err;
    }
  });
};

init();
