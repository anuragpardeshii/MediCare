const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

// POST route to create an appointment
router.post('/appointments', appointmentController.createAppointment);
router.get('/appointments', appointmentController.getAllAppointments);
router.delete('/appointments/:id', appointmentController.cancelAppointment);
router.get('/appointments/patient/:userId', appointmentController.getAppointmentsByPatient);

module.exports = router;
