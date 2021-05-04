"use strict";

var mongoose = require("mongoose");

var autoIncrement = require("mongoose-auto-increment");

var connnect = mongoose.createConnection("mongodb+srv://Project:qwer1234@project.7jm4w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
autoIncrement.initialize(connnect);
var FreeBoardReplySchema = mongoose.Schema({
  fReNo: Number,
  fBoardNo: Number,
  fReUserid: {
    type: String,
    required: true
  },
  fReComment: {
    type: String,
    required: true
  },
  fReDate: {
    type: Date,
    "default": Date.now
  }
});
FreeBoardReplySchema.plugin(autoIncrement.plugin, {
  model: "FreeBoardReply",
  field: "fReNo",
  startAt: 1,
  increment: 1
});
module.exports = mongoose.model("FreeBoardReply", FreeBoardReplySchema);