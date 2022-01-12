const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const Session = new Schema({
  refreshToken: {
    type: String,
    default: "",
  },
})

const User = new Schema({
  authStrategy: {
    type: String,
    default: "local",
  },
  refreshToken: {
    type: [Session],
  },
})

//remove refresh token
User.set("toJSON", {
  transform: (doc, ret, options) => {
    delete ret.refreshToken
    return ret
  },
})

User.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", User);