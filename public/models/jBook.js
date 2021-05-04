const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");


const connnect = mongoose.createConnection(
  "mongodb+srv://Project:qwer1234@project.7jm4w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

autoIncrement.initialize(connnect);

const jBookSchema = mongoose.Schema({
  jBookNo: Number,
  jBookTitle: { type: String, required: true },
  jBookImg:{ type : String, required : true },
  // jBookLike: {
  //   type: Number,
  //   default: 0,
  // },
  jBookReply: String,
});

jBookSchema.plugin(autoIncrement.plugin, {
  model: "jBook",
  field: "jBookNo",
  startAt: 1,
  increment: 1,
});

module.exports = mongoose.model("jBook", jBookSchema);
