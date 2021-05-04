var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const cors = require('cors')

mongoose.Promise = global.Promise;

mongoose
  .connect(
    "mongodb+srv://Project:qwer1234@project.7jm4w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log("몽고디비 오랜만이얌");
  })
  .catch((e) => {
    console.error(e);
  });

var indexRouter = require("./routes/index");
const freeBoardRouter = require("./routes/board/freeBoard");
const foodBoardRouter = require("./routes/board/foodBoard");
const addBoardRouter = require("./routes/board/addBoard");
const cBookRouter = require("./routes/book/cBook");
const jBookRouter = require("./routes/book/jBook");
const kBookRouter = require("./routes/book/kBook");
const wBookRouter = require("./routes/book/wBook");
const userRouter = require("./routes/users/user");


var app = express();

app.use(cors())
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
// 자유게시판
app.use("/freeBoard", freeBoardRouter);
// 맛집게시판
app.use("/foodBoard", foodBoardRouter);
// 추가 게시판
app.use("/addBoard", addBoardRouter);
// 유저 Router
app.use("/users", userRouter);
// 한식 북
app.use("/kBook", kBookRouter);
// 중식 북
app.use("/cBook", cBookRouter);
// 일식 북
app.use("/jBook", jBookRouter);
// 양식 북
app.use("/wBook", wBookRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
