const mongoose = require("mongoose");

let mongo_URI =
  "mongodb+srv://Hurmit:hurmit123@cluster0.6gg6hnz.mongodb.net/?retryWrites=true&w=majority";

const connectDB = (handler) => async (req, res) => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(mongo_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected`);
    return handler(req, res);
  } catch (e) {
    console.log(`Error: ${e.message}`);
    return res
      .status(400)
      .send("Something went wrong while connecting to Database");
  }
};

module.exports = connectDB;
