import UserModel from "../../../models/user.model";
import connectDB from "../../../config/db";
import { generateToken } from "../../../../sports_app(take-live-calls)/backend/config/generateToken";

const handler = async (req, res) => {
  if (req.method == "POST") {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send("Please enter all the fields");
    }
    const userExists = await UserModel.findOne({ username });
    if (userExists) return res.status(401).send("User Already Exists !");
    const user = await UserModel.create({ username, password });
    if (user) {
      return res.status(201).json({
        _id: user._id,
        username: user.username,
        password: user.email,
        token: generateToken(user._id),
      });
    }
    return res.status(400).send("Failed to create User.");
  }
  return res.status(400).send("BAD REQUEST, Invalid API path");
};

export default connectDB(handler);
