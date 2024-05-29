const { Schema, model } = require("mongoose");

const locationSchema = new Schema({
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
});

const hikeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  location: locationSchema,
  placeId: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  formatted_address: {
    type: String,
    required: true,
  },
});

const Hike = model("Hike", hikeSchema);

module.exports = Hike;
