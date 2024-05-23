const models = require("../models");
const db = require("../config/connection");

module.exports = async (collectionName) => {
  try {
    await db.dropCollection(collectionName);
  } catch (err) {
    throw err;
  }
};
