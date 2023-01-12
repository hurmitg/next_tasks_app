import UserModel from "../../../models/user.model";
import connectDB from "../../../config/db";
import { generateToken } from "../../../config/generateToken";

const handler = async (req, res) => {
  if (req.method == "POST") {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send("Please enter all the fields");
    }

    const user = await UserModel.findOne({ username });

    if (user && user.password == password) {
      return res.status(201).json({
        _id: user._id,
        username: user.username,
        token: generateToken(user._id),
      });
    }
    return res.status(401).send("Invalid Credentials");
  }
  return res.status(400).send("BAD REQUEST, Invalid API path");
};

export default connectDB(handler);
