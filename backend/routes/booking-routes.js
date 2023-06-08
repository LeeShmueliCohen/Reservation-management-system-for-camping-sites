const express = require('express');
const sessionController = require('../controllers/session-controller');
const bookingCortroller = require('../controllers/booking-controller');
const router = express.Router();

router.post('/session', sessionController.createBookingSession);
router.post('/session/clear', sessionController.clearBookingSession);
//router.get('/session', bookingController.getBookingSession);
router.post('/:sessionId/create', bookingCortroller.createBooking);

router.patch('/update', bookingCortroller.updateBookingPayment);
router.get('/:bookingId', bookingCortroller.getBookingDetails);

module.exports = router;
