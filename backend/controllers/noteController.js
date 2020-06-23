const Note = require("../models/note");
const validator = require("express-validator");

// all notes
exports.note_get = function (req, res) {
  Note.find({ user: req.user._id }).exec(function (err, note_list) {
    if (err) {
      return next(err);
    }
    const notes = note_list.map((note) => {
      return {
        content: note.content,
        date: note.formattedDate,
      };
    });
    res.json(notes);
  });
};

// handle notes create on POST
exports.note_create_post = [
  // sanitize all fields
  validator.sanitizeBody("*").escape(),
  // process request after validation and sanitization
  function (req, res, next) {
    const note = new Note({
      content: req.body.content,
      user: req.user._id,
    }).save((err) => {
      if (err) {
        return next(err);
      }
      res.sendStatus(200);
    });
  },
];
