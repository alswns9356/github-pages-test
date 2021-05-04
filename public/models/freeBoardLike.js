const mongoose = require("mongoose");

const FreeBoardLikeSchema = mongoose.Schema({
  fNo: Number,
  fUserid: String,
});

module.exports = mongoose.model("FreeBoardLike", FreeBoardLikeSchema);
