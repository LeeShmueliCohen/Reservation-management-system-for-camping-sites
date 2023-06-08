const axios = require('axios');
const Site = require('../models/siteSchema');
const Relation = require('../models/sitePlaceRelationSchema');

const getAllSites = async (req, res) => {
  try {
    const sites = await Site.find({});

    // Fetch additional data from the external API
    const response = await axios.get(`${process.env.API_DIR}/category`, {
      headers: {
        Accept: 'application/json',
        Authorization: `${process.env.API_TOKEN}`,
      },
    });

    const externalData = response.data.category;
    // Add the values from the external API data to the database data
    const updatedSites = sites.map((site) => {
      const siteId = site._id.toString();

      if (externalData[siteId]) {
        return { ...site.toObject(), ...externalData[siteId] };
      } else {
        return site;
      }
    });

    res.status(200).send(updatedSites);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch sites' });
  }
};

const getSiteRelationPlace = async (req, res) => {
  let relations;
  try {
    if (req.query.siteId) {
      const siteId = req.query.siteId;
      relations = await Relation.find({ siteId });
    } else if (req.query.placeId) {
      const placeId = req.query.placeId;
      relations = await Relation.find({ placeId });
    } else {
      relations = await Relation.find({});
    }

    if (!relations || relations.length === 0) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.status(200).send(relations);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { getAllSites, getSiteRelationPlace };
