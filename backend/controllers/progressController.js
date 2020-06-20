const Progress = require("../models/progress");
const validator = require("express-validator");

// list of all hours trained
exports.index = function (req, res) {
  Progress.find({ user: req.user._id }).exec(function (err, hours_list) {
    if (err) {
      return next(err);
    }
    const hours = hours_list.map((hoursEntry) => {
      return {
        hoursTrained: hoursEntry.hoursTrained,
      };
    });
    res.json(hours);
  });
};

// handle progress create on POST
exports.progress_create_post = [
  // sanitize all fields
  validator.sanitizeBody("*").escape(),
  // process request after validation and sanitization
  function (req, res, next) {
    const progress = new Progress({
      hoursTrained: req.body.hoursTrained,
      user: req.user._id,
    }).save((err) => {
      if (err) {
        return next(err);
      }
      res.sendStatus(200);
    });
  },
];
