const express = require("express");
const session = require("../session");
const { User } = require("../../public/models/user");
const { auth } = require("./middleware/auth");
const router = express.Router();

router.use(session);


router.post("/register", (req, res) => {
  const user = new User(req.body);
  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

// User.comparePassword = function (plainPassword, cb) {
//   //plainPassword 1234567    암호회된 비밀번호 $2b$10$l492vQ0M4s9YUBfwYkkaZOgWHExahjWC
//   bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
//     console.log(plainPassword,'@@@', this.password)
//     if (err) return cb(err);
//     cb(null, isMatch);
//   });
// };

// 로그인
router.post("/login", (req, res) => {
  User.findOne({ id: req.body.id }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "Auth failed, id not found",
      });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "Wrong password" });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie("w_authExp", user.tokenExp);
        res.cookie("w_auth", user.token).status(200).json({
          loginSuccess: true,
          userId: user._id,
        });
        req.session.loginde = true;
        req.session.user_id = req.body.id;

        req.session.save();
        console.log("로그인 완료");
      });
    });
  });
});

// 로그아웃
router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "", tokenExp: "" },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      req.session.destroy();
      return res.status(200).send({
        success: true,
      });
    }
  );
});

router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    id: req.user.id,
    nickname: req.user.nickname,
    // role: req.user.role,
    // image: req.user.image,
  });
});

module.exports = router;
