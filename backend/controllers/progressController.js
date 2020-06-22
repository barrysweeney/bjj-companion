const Progress = require("../models/progress");
const validator = require("express-validator");

// list of total hours trained by month
exports.progress_month_get = function (req, res) {
  Progress.find({ user: req.user._id }).exec(function (err, hours_list) {
    if (err) {
      return next(err);
    }
    const hours = hours_list
      .filter(
        (hoursEntry) => parseInt(hoursEntry.month) === parseInt(req.params.id)
      )
      .map((hoursEntry) => {
        return {
          hoursTrained: hoursEntry.hoursTrained,
          date: hoursEntry.date,
        };
      });
    if (hours.length > 0) {
      res.json(hours[hours.length - 1].hoursTrained);
    } else {
      res.json(0);
    }
  });
};

// list of total hours trained by year
exports.progress_year_get = function (req, res) {
  Progress.find({ user: req.user._id }).exec(function (err, hours_list) {
    if (err) {
      return next(err);
    }
    const hours = hours_list
      .filter(
        (hoursEntry) => parseInt(hoursEntry.year) === parseInt(req.params.id)
      )
      .map((hoursEntry) => {
        return {
          hoursTrained: hoursEntry.hoursTrained,
          date: hoursEntry.date,
        };
      });
    if (hours.length > 0) {
      res.json(hours[hours.length - 1].hoursTrained);
    } else {
      res.json(0);
    }
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
