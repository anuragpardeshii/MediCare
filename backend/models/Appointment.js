const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    consultationType: { type: String, required: true },
    phone: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // 🔹 Changed `id` to `userId`
    doctor: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    symptoms: { type: String },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
