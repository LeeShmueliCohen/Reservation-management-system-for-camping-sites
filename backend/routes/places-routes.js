const express = require('express');
const router = express.Router();
const placeController = require('../controllers/place-controller');

router.get('/', placeController.getDataBasePlaces);
router.post('/', placeController.addPlace);
router.put('/:_id', placeController.updatePlace);
router.delete('/:_id', placeController.removePlace);
router.get('/:siteId', placeController.getPlacesBySiteId);

module.exports = router;
