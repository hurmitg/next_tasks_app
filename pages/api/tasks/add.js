import { protect } from "../../../middlewares/auth.middleware";
import connectDB from "../../../config/db";
import TaskModel from "../../../models/task.model";

const handler = async (req, res) => {
  if (req.method == "POST") {
    let { task } = req.body;

    let start = new Date();
    start.setHours(0, 0, 0, 0);
    let end = new Date();
    end.setHours(23, 59, 59, 999);

    let currentDayTasks = await TaskModel.find({
      $and: [{ user: req.user }, { createdAt: { $gte: start, $lt: end } }],
    });

    if (currentDayTasks.length > 0) {
      {
        const { _id } = currentDayTasks[0];
        currentDayTasks[0].tasks.length < 5
          ? await TaskModel.updateOne({ _id }, { $push: { tasks: task } })
          : res.status(405).send("Limit exceeded");
      }
    } else {
      await TaskModel.create({
        user: req.user,
        tasks: [task],
      });
    }

    let newTasks = await TaskModel.find({
      $and: [{ user: req.user }, { createdAt: { $gte: start, $lt: end } }],
    }).populate("tasks");

    return res.status(200).send(newTasks);
  }
  return res.status(400).send("BAD REQUEST, Invalid API path");
};

export default connectDB(protect(handler));
