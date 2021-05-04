const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");


const connnect = mongoose.createConnection(
  "mongodb+srv://Project:qwer1234@project.7jm4w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

autoIncrement.initialize(connnect);

const kBookSchema = mongoose.Schema({
  kBookNo: Number,
  kBookTitle: { type: String, required: true },
  kBookImg:{ type : String, required : true },
  // kBookLike: {
  //   type: Number,
  //   default: 0,
  // },
  kBookReply: String,
});

kBookSchema.plugin(autoIncrement.plugin, {
  model: "kBook",
  field: "kBookNo",
  startAt: 1,
  increment: 1,
});

module.exports = mongoose.model("kBook", kBookSchema);
