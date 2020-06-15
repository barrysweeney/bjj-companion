const User = require("../models/user");
const validator = require("express-validator");
const bcrypt = require("bcryptjs");

// handle user create on POST
exports.user_create_post = [
  validator.body("username").trim(),
  // sanitize all fields
  validator.sanitizeBody("*").escape(),
  // process request after validation and sanitization
  (req, res, next) => {
    // extract validation errors from request
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      // there are errors
      res.sendStatus(500);
    } else {
      // create and save a user object with escaped data and hashed password
      bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) {
          return next(err);
        }
        const user = new User({
          username: req.body.username,
          password: hashedPassword,
        }).save((err) => {
          if (err) {
            return next(err);
          }
          res.sendStatus(201);
        });
      });
    }
  },
];
