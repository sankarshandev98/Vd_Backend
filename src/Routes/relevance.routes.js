const express = require("express");
const router = express.Router();
const Vds = require("../Model/vd.model");

router.get("/", async (req, res) => {
  let data = await Vds.find(
    {
      country: { $eq: "United States of America" },
    },
    {
      _id: 0,
      end_year: 0,
      intensity: 0,
      //   sector: 0,
      topic: 0,
      insight: 0,
      url: 0,
      region: 0,
      start_year: 0,
      impact: 0,
      added: 0,
      published: 0,
      country: 0,
      relevance: 0,
      pestle: 0,
      source: 0,
      title: 0,
      likelihood: 0,
    }
  );
  res.send(data);
});

// filter by sector (Average relevance based on country)

router.get("/:sector", async (req, res) => {
  let sector = req.params.sector;
  let data = await Vds.aggregate([
    {
      $match: {
        sector: { $eq: sector },
        relevance: { $ne: "" },
        country: { $ne: "" },
      },
    },
    {
      $group: {
        _id: "$country",
        avr: { $avg: "$relevance" },
      },
    },
  ]);
  res.send(data);
});

module.exports = router;
