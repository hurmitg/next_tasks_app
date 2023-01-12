import { protect } from "../../../middlewares/auth.middleware";
import connectDB from "../../../config/db";
import TaskModel from "../../../models/task.model";

const handler = async (req, res) => {
  try {
    let start = new Date();
    start.setHours(0, 0, 0, 0);
    let end = new Date();
    end.setHours(23, 59, 59, 999);

    let newTasks = await TaskModel.find({
      $and: [{ user: req.user._id }, { createdAt: { $gte: start, $lt: end } }],
    }).populate("tasks");
    console.log(newTasks);
    return res.status(200).send(newTasks);
  } catch (error) {
    console.log(error);
    return res.status(400).send("REQUEST FAILED");
  }
};

export default connectDB(protect(handler));
