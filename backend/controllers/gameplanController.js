const Gameplan = require("../models/gameplan");

// list of all gameplans
exports.index = function (req, res) {
  console.log("got here 1");
  Gameplan.find()
    .populate("user")
    .exec(function (err, gameplan_list) {
      if (err) {
        return next(err);
      }
      res.json(gameplan_list);
    });
};

// handle gameplan create on POST
exports.gameplan_create_post = function (req, res, next) {
  const gameplan = new Gameplan({
    title: req.body.title,
    positions: req.body.positions,
    user: req.user._id,
  }).save((err) => {
    if (err) {
      return next(err);
    }
    res.sendStatus(200);
  });
};
