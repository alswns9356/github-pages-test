const mongoose = require("mongoose");

const FoodBoardLikeSchema = mongoose.Schema({
  foNo: Number,
  foUserid: String,
});

module.exports = mongoose.model("FoodBoardLike", FoodBoardLikeSchema);
