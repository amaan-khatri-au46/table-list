const mongoose = require("mongoose");

const TableSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
});

module.exports = mongoose.model("Table", TableSchema);
