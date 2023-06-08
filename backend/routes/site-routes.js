const express = require('express');
const router = express.Router();
const siteController = require('../controllers/site-controller');

router.get('/', siteController.getAllSites);
router.get('/places', siteController.getSiteRelationPlace);
module.exports = router;
