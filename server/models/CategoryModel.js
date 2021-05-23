const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  name: { type: String, required: true },
  icon: { type: String },
  color: { type: String },
  image: { type: String },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
