const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameplanSchema = new Schema({
  positions: { type: String, required: true },
  moves: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Gameplan", GameplanSchema);
