const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameplanSchema = new Schema({
  title: { type: String, required: true },
  positions: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Gameplan", GameplanSchema);
