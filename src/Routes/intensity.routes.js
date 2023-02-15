const express = require("express");
const router = express.Router();
const Vds = require("../Model/vd.model");

router.get("/", async (req, res) => {
  let data = await Vds.find(
    {},
    {
      _id: 0,
      end_year: 0,
      intensity: 0,
      sector: 0,
      topic: 0,
      insight: 0,
      url: 0,
      region: 0,
      start_year: 0,
      impact: 0,
      added: 0,
      // published: 0,
      country: 0,
      relevance: 0,
      pestle: 0,
      source: 0,
      title: 0,
      likelihood: 0,
    }
  ).limit(10);
  res.send(data);
});

// filter by country (Average intensity based on pestle)

router.get("/:country", async (req, res) => {
  let country = req.params.country;
  let data = await Vds.aggregate([
    {
      $match: {
        country: { $eq: country },
        intensity: { $ne: "" },
        pestle: { $ne: "" },
      },
    },
    {
      $group: {
        _id: "$pestle",
        avr: { $avg: "$intensity" },
      },
    },
  ]);
  res.send(data);
});

module.exports = router;
