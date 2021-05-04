const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");


const connnect = mongoose.createConnection(
  "mongodb+srv://Project:qwer1234@project.7jm4w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

autoIncrement.initialize(connnect);

const FreeBoardSchema = mongoose.Schema({
  fNo: Number,
  fTitle: { type: String, required: true },
  fUserid: { type: String, required: true },
  fContent: { type: String, required: true },
  fDate: {
    type: Date,
    default: Date.now,
  },
  fLike: {
    type: Number,
    default: 0,
  },
  fView: {
    type: Number,
    default: 0,
  },
  fReply: String,
});

FreeBoardSchema.plugin(autoIncrement.plugin, {
  model: "FreeBoard",
  field: "fNo",
  startAt: 1,
  increment: 1,
});

module.exports = mongoose.model("FreeBoard", FreeBoardSchema);
