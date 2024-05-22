const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const hikeSchema = new Schema({
  name: { type: String },
  location: { type: String },
  difficulty: { type: String },
  length: { type: String },
  rating: { type: String },
  image: { type: String },
});

const profileSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorite_hikes: [hikeSchema],
  future_hikes: [hikeSchema],
});

// set up pre-save middleware to create password
profileSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
profileSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
