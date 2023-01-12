const { Schema, model, default: mongoose } = require("mongoose");

const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

mongoose.models = {};
const UserModel = model("User", UserSchema);

module.exports = UserModel;
