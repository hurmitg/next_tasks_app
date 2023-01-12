const jwt = require("jsonwebtoken");
const jwt_Secret = "tasks@123#app";
/**
 * Generates a JWT token for the given user ID.
 */
const generateToken = (id) => {
  return jwt.sign({ id }, jwt_Secret, {
    expiresIn: "10d",
  });
};

const verifyToken = (token) => {
  let decoded;
  try {
    decoded = jwt.verify(token, jwt_Secret);
  } catch (error) {
    return false;
  }
  return decoded;
};

module.exports = { generateToken, verifyToken, jwt_Secret };
