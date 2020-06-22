const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProgressSchema = new Schema({
  hoursTrained: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: new Date(), required: true },
});

// virtual for Progress entry month and year
// months are indexed 0-11
ProgressSchema.virtual("month").get(function () {
  return new Date(this.date).getMonth();
});

ProgressSchema.virtual("year").get(function () {
  return new Date(this.date).getFullYear();
});

module.exports = mongoose.model("Progress", ProgressSchema);
