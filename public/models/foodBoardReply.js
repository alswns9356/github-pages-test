const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const connnect = mongoose.createConnection(
  "mongodb+srv://Project:qwer1234@project.7jm4w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

autoIncrement.initialize(connnect);

const FoodBoardReplySchema = mongoose.Schema({
  foReNo: Number,
  foBoardNo: Number,
  foReUserid: {type:String,required:true},
  foReComment: {type:String,required:true},
  foReDate: {
    type: Date,
    default: Date.now,
  },
});

FoodBoardReplySchema.plugin(autoIncrement.plugin, {
  model: "FoodBoardReply",
  field: "foReNo",
  startAt: 1,
  increment: 1,
});

module.exports = mongoose.model("FoodBoardReply", FoodBoardReplySchema);