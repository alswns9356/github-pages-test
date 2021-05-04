const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const connnect = mongoose.createConnection(
  "mongodb+srv://Project:qwer1234@project.7jm4w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

autoIncrement.initialize(connnect);

const jBookReplySchema = mongoose.Schema({
  jBookReNo: Number,
  jBookNo: Number,
  jBookReUserid: {type:String,required:true},
  jBookReComment: {type:String,required:true},
  jBookReDate: {
    type: Date,
    default: Date.now,
  },
});

jBookReplySchema.plugin(autoIncrement.plugin, {
  model: "jBookReply",
  field: "jBookReNo",
  startAt: 1,
  increment: 1,
});

module.exports = mongoose.model("jBookReply", jBookReplySchema);
