const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dateFns = require("date-fns");

const NoteSchema = new Schema({
  content: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: new Date(), required: true },
});

// virtual for formatted date
NoteSchema.virtual("formattedDate").get(function () {
  return dateFns.format(new Date(this.date), "iii do MMM y");
});

module.exports = mongoose.model("Note", NoteSchema);
