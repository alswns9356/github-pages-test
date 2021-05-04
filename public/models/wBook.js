const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");


const connnect = mongoose.createConnection(
  "mongodb+srv://Project:qwer1234@project.7jm4w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

autoIncrement.initialize(connnect);

const wBookSchema = mongoose.Schema({
  wBookNo: Number,
  wBookTitle: { type: String, required: true },
  wBookImg:{ type : String, required : true },
  // wBookLike: {
  //   type: Number,
  //   default: 0,
  // },
  wBookReply: String,
});

wBookSchema.plugin(autoIncrement.plugin, {
  model: "wBook",
  field: "wBookNo",
  startAt: 1,
  increment: 1,
});

module.exports = mongoose.model("wBook", wBookSchema);
