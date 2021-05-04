const express = require("express");
const router = express.Router();

const session = require("./session");

router.use(session);

/* GET home page. */
router.get("/", function (req, res, next) {
  if (req.session.user_id == undefined) {
    return res.status(200).json({
      data: false,
    });
  } else {
    return res.status(200).json({
      data: true,
    });
  }
});


module.exports = router;
