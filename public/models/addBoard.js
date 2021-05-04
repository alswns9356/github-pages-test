const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

const connect = mongoose.createConnection(
  "mongodb+srv://Project:qwer1234@project.7jm4w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);
autoIncrement.initialize(connect);

const AddBoardSchema = mongoose.Schema({
  aNo: Number,
  aUserid: { type: String, required: true },
  aContent: { type: String, required: true },
  aDate: {
    type: Date,
    default: Date.now,
  },
});

AddBoardSchema.plugin(autoIncrement.plugin, {
  model: "AddBoard",
  field: "aNo",
  startAt: 1,
  increment: 1,
});

module.exports = mongoose.model("AddBoard", AddBoardSchema);
