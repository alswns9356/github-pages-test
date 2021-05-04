const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");


const connnect = mongoose.createConnection(
  "mongodb+srv://Project:qwer1234@project.7jm4w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

autoIncrement.initialize(connnect);

const cBookSchema = mongoose.Schema({
  cBookNo: Number,
  cBookTitle: { type: String, required: true },
  cBookImg:{ type : String, required : true },
  // cBookLike: {
  //   type: Number,
  //   default: 0,
  // },
  cBookReply: String,
});

cBookSchema.plugin(autoIncrement.plugin, {
  model: "cBook",
  field: "cBookNo",
  startAt: 1,
  increment: 1,
});

module.exports = mongoose.model("cBook", cBookSchema);
