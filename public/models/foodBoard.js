const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

const connect = mongoose.createConnection(
  "mongodb+srv://Project:qwer1234@project.7jm4w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

autoIncrement.initialize(connect);

const FoodBoardSchema = mongoose.Schema({
  foNo: Number,
  foTitle: { type: String, required: true },
  foUserid: { type: String, required: true },
  foContent: { type: String, required: true },
  foDate: {
    type: Date,
    default: Date.now,
  },
  foLike: {
    type: Number,
    default: 0,
  },
  foView: {
    type: Number,
    default: 0,
  },
  foReply: String,
});

FoodBoardSchema.plugin(autoIncrement.plugin, {
  model: "FoodBoard",
  field: "foNo",
  startAt: 1,
  increment: 1,
});

module.exports = mongoose.model("FoodBoard", FoodBoardSchema);
