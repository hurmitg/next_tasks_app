const { Schema, model } = require("mongoose");

const TaskSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    tasks: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const TaskModel = model("Task", TaskSchema);

module.exports = TaskModel;
