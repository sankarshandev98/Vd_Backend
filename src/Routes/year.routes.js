const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Vds = require("../Model/vd.model");

router.get("/", async (req, res) => {
  let data = await Vds.find(
    {
      //   country: { $eq: "United States of America" },
    },
    {
      _id: 0,
      end_year: 0,
      intensity: 0,
      sector: 0,
      topic: 0,
      insight: 0,
      url: 0,
      // region: 0,
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

// filter by region (Average growth based on year)

router.get("/:region", async (req, res) => {
  let region = req.params.region;
  let data = await Vds.aggregate([
    {
      $match: {
        intensity: { $ne: "" },
        published: { $ne: "" },
        topic: "growth",
        region: region,
      },
    },
    {
      $group: {
        _id: "$published",
        avr: { $avg: "$intensity" },
      },
    },
  ]);
  res.send(data);
});

module.exports = router;
