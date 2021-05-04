const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const connnect = mongoose.createConnection(
  "mongodb+srv://Project:qwer1234@project.7jm4w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

autoIncrement.initialize(connnect);

const cBookReplySchema = mongoose.Schema({
  cBookReNo: Number,
  cBookmNo: Number,
  cBookReUserid: {type:String,required:true},
  cBookReComment: {type:String,required:true},
  cBookReDate: {
    type: Date,
    default: Date.now,
  },
});

cBookReplySchema.plugin(autoIncrement.plugin, {
  model: "cBookReply",
  field: "cBookReNo",
  startAt: 1,
  increment: 1,
});

module.exports = mongoose.model("cBookReply", cBookReplySchema);
