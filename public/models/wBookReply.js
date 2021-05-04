const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const connnect = mongoose.createConnection(
  "mongodb+srv://Project:qwer1234@project.7jm4w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

autoIncrement.initialize(connnect);

const wBookReplySchema = mongoose.Schema({
  wBookReNo: Number,
  wBookNo: Number,
  wBookReUserid: {type:String,required:true},
  wBookReComment: {type:String,required:true},
  wBookReDate: {
    type: Date,
    default: Date.now,
  },
});

wBookReplySchema.plugin(autoIncrement.plugin, {
  model: "wBookReply",
  field: "wBookReNo",
  startAt: 1,
  increment: 1,
});

module.exports = mongoose.model("wBookReply", wBookReplySchema);
