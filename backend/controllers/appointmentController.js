const Appointment = require('../models/Appointment');

// Create a new appointment
exports.createAppointment = async (req, res) => {
  try {
    const { firstName, lastName, consultationType, phone, doctor, date, time, symptoms, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const newAppointment = new Appointment({
      firstName,
      lastName,
      consultationType,
      phone,
      doctor,
      date,
      time,
      userId, // ✅ Store `userId` properly
      symptoms,
    });

    await newAppointment.save();
    res.status(201).json({ message: "Appointment booked successfully!", appointment: newAppointment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error booking appointment", error: error.message });
  }
};

exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find(); // Fetch all appointments from the database
    res.status(200).json(appointments); // Return the appointments as a response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching appointments' });
  }
};

exports.cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByIdAndDelete(id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found.' });
    }

    res.status(200).json({ message: 'Appointment canceled successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error canceling appointment.' });
  }
};

exports.getAppointmentsByPatient = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch appointments by user ID
    const appointments = await Appointment.find({ user: userId }).sort({ date: 1 });

    if (!appointments) {
      return res.status(404).json({ message: 'No appointments found for this user.' });
    }

    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};