const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const connnect = mongoose.createConnection(
  "mongodb+srv://Project:qwer1234@project.7jm4w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

autoIncrement.initialize(connnect);

const kBookReplySchema = mongoose.Schema({
  kBookReNo: Number,
  kBookNo: Number,
  kBookReUserid: {type:String,required:true},
  kBookReComment: {type:String,required:true},
  kBookReDate: {
    type: Date,
    default: Date.now,
  },
});

kBookReplySchema.plugin(autoIncrement.plugin, {
  model: "kBookReply",
  field: "kBookReNo",
  startAt: 1,
  increment: 1,
});

module.exports = mongoose.model("kBookReply", kBookReplySchema);
