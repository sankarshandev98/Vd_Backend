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
      sector: 0,
      //topic: 0,
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

// filter by topic (Total likelihood based on country)

router.get("/:topic", async (req, res) => {
  let topic = req.params.topic;
  let data = await Vds.aggregate([
    {
      $match: {
        topic: { $eq: topic },
        country: { $ne: "" },
        likelihood: { $ne: "" },
      },
    },
    {
      $group: {
        _id: "$country",
        tot: { $sum: "$likelihood" },
      },
    },
  ]);
  res.send(data);
});

module.exports = router;
