const express = require("express");
const router = express.Router();
const Place = require("../models/placeSchema");
const Site = require("../models/siteSchema");
const Relation = require("../models/sitePlaceRelationSchema");

router.post("/places", async (req, res, next) => {
  const placesArray = req.body;

  try {
    await Promise.all(
      placesArray.map(async (placeData) => {
        const place = new Place(placeData);
        await place.save();
      })
    );
    res.status(201).send("All places saved successfully.");
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/sites", async (req, res, next) => {
  const site = new Site(req.body);
  try {
    await site.save();
    res.status(201).send(site);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/rel", async (req, res, next) => {
  const placeArr = req.body;

  try {
    await Promise.all(
      placeArr.map(async (placeData) => {
        const rel = new Relation(placeData);
        await rel.save();
      })
    );
    res.status(201).send("All relational places are saved successfully.");
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
