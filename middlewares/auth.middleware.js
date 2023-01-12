const jwt = require("jsonwebtoken");
const { jwt_Secret } = require("../config/generateToken");
const UserModel = require("../models/user.model");

const protect = (handler) => async (req, res) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, jwt_Secret);
      req.user = await UserModel.findById(decoded.id).select("-password");
      return handler(req, res);
    } catch (e) {
      res.status(401).send("Not authorized, Invalid Credentials");
    }
  }

  if (!token) {
    res.status(401).send("Please Login");
  }
};

module.exports = { protect };
