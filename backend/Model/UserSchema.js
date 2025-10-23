import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: function () {
      return !this.googleId;   // Google login me required false
    },
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
   
  },
  googleId: {
    type: String,
    default: null,
  },
  profilePic: String,
});

export default mongoose.model("User", userSchema);
