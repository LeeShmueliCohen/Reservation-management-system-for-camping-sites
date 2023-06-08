const axios = require('axios');
const Place = require('../models/placeSchema');
const Relation = require('../models/sitePlaceRelationSchema');

// get the small img in checkfront
function smallImg(imgObj) {
  try {
    return imgObj['1'].url_small;
  } catch (TypeError) {
    return null;
  }
}

const fetchExternalData = async (
  startDate,
  endDate,
  siteId,
  adult = 1,
  child = null,
  toddler = null
) => {
  try {
    const response = await axios.get(`${process.env.API_DIR}/item`, {
      params: {
        start_date: startDate,
        end_date: endDate,
        category_id: siteId,
        'param[adult]': adult,
        'param[child]': child,
        'param[toddler]': toddler,
      },
      headers: {
        Accept: 'application/json',
        Authorization: `${process.env.API_TOKEN}`,
      },
    });

    if (response.status !== 200) {
      throw new Error('Failed to fetch data from the external API');
    }

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getPlacesBySiteId = async (req, res) => {
  try {
    const { startDate, endDate, adult, child, toddler } = req.query;
    const siteId = req.params.siteId;

    const relations = await Relation.find({ siteId }).populate('placeId');
    const places = relations.map((relation) => relation.placeId);

    // Fetch additional data from the external API
    const externalData = await fetchExternalData(
      startDate,
      endDate,
      siteId,
      adult,
      child,
      toddler
    );
    // Add the values from the external API data to the database data
    const updatedPlaces = places.map((placeObjDb) => {
      const placeId = placeObjDb._id.toString();
      if (externalData.items && externalData.items[placeId]) {
        return {
          ...placeObjDb.toObject(),
          title: externalData.items[placeId].name,
          summary: externalData.items[placeId].summary,
          status: externalData.items[placeId].rate.status,
          available: externalData.items[placeId].rate.available,
          slip: externalData.items[placeId].rate.slip,
          price: externalData.items[placeId].rate.summary.price,
          localStartDate: externalData.items[placeId].local_start_date,
          localEndDate: externalData.items[placeId].local_end_date,
          nights: externalData.items[placeId].days,
          label: externalData.items[placeId].meta.productLabel,
          error:
            externalData.items[placeId].rate.status === 'ERROR'
              ? externalData.items[placeId].rate.error
              : null,

          // return null if there is not img found
          smallImg: smallImg(externalData.items[placeObjDb.id].image),
          imgMedium:
            externalData.items[placeObjDb.id]?.image?.['1']?.url_medium ?? null,
        };
      } else {
        return placeObjDb;
      }
    });

    res.status(200).send(updatedPlaces);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch places' });
  }
};

const addPlace = async (req, res) => {
  const { siteId } = req.query;
  const place = new Place(req.body);
  //   { "placeId": "5", "siteId": "2" }
  const rel = new Relation({
    placeId: req.body._id,
    siteId,
  });
  try {
    await place.save();
    await rel.save();

    res.status(201).send({ place, rel });
  } catch (error) {
    res.status(400).send(error);
  }
};

const getDataBasePlaces = async (req, res) => {
  let places;
  if (req.query.id) {
    const id = req.query.id;
    places = await Place.find({ _id: id });
  } else {
    places = await Place.find({});
  }
  try {
    res.status(200).send(places);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getDataBasePlaceById = async (req, res) => {
  try {
    const _id = req.params._id;
    const places = await Place.find({ _id });

    res.status(200).send(places);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updatePlace = async (req, res) => {
  const { _id } = req.params;
  const { body } = req;

  try {
    const place = await Place.findByIdAndUpdate(_id, body, { new: true });
    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }
    res.status(200).json(place);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const removePlace = async (req, res) => {
  const { _id } = req.params;

  try {
    const place = await Place.findByIdAndRemove(_id);
    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }

    // Also remove the related entries from the Relation collection
    await Relation.deleteMany({ placeId: _id });

    res
      .status(200)
      .json({ message: 'Place and its relations removed successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addPlace,
  getPlacesBySiteId,
  getDataBasePlaces,
  getDataBasePlaceById,
  updatePlace,
  removePlace,
};
