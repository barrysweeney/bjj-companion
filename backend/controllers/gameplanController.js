const Gameplan = require("../models/gameplan");
const validator = require("express-validator");

// list of all gameplans
exports.index = function (req, res) {
  Gameplan.find({ user: req.user._id }).exec(function (err, gameplan_list) {
    if (err) {
      return next(err);
    }
    const gameplans = gameplan_list.map((gameplan) => {
      return {
        positions: gameplan.positions,
        moves: gameplan.moves,
      };
    });
    res.json(gameplans);
  });
};

// handle gameplan create on POST
exports.gameplan_create_post = [
  validator.body("positions").trim(),
  validator.body("moves").trim(),
  // sanitize all fields
  validator.sanitizeBody("*").escape(),
  // process request after validation and sanitization
  function (req, res, next) {
    const gameplan = new Gameplan({
      positions: req.body.positions,
      moves: req.body.moves,
      user: req.user._id,
    }).save((err) => {
      if (err) {
        return next(err);
      }
      res.sendStatus(200);
    });
  },
];
