const express = require('express');

const router = express.Router();
const userController = require('../controllers/user-controller');
const appointmentController = require('../controllers/appointment-controller');

// Avoid caching
function setNoCache(req, res, next) {
  res.set('Pragma', 'no-cache');
  res.set('Cache-Control', 'no-cache, no-store');
  next();
}

// Test app runtime
router.get('/', (req, res) => {
  res.status(200).json({
    detail: 'Test Heartbeat',
    status: 'Success',
  });
});

// User controller
router.post('/user/findUser', setNoCache, userController.findUserByEmail);
router.post('/user/firstRegister', setNoCache, userController.registerUser);

// Appointment controller
router.get(
  '/appointment/checkAppointment/:id',
  appointmentController.checkUserAppointment
);
router.post(
  '/appointment/checkAppointmentByDate',
  setNoCache,
  appointmentController.checkUserAppointmentByDate
);
router.post(
  '/appointment/createAppointment',
  setNoCache,
  appointmentController.createAppointment
);
router.delete(
  '/appointment/cancelAppointment/:id',
  appointmentController.cancelAppointment
);

module.exports = router;
