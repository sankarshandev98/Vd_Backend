const mongoose = require("mongoose");
const vdSchema = new mongoose.Schema({
  id: Number,
  end_year: String,
  intensity: Number,
  sector: String,
  topic: String,
  insight: String,
  url: String,
  region: String,
  start_year: String,
  impact: String,
  added: String,
  published: String,
  country: String,
  relevance: Number,
  pestle: String,
  source: String,
  title: String,
  likelihood: Number,
});

const Vds = mongoose.model("vd", vdSchema);

module.exports = Vds;
