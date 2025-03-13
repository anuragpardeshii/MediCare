import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import `useNavigate` instead of `useHistory`

export default function Book() {
  const [doctors, setDoctors] = useState([]);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    consultationType: "",
    phone: "",
    doctor: "",
    date: "",
    time: "",
    symptoms: "",
    id: "", // Will be set later when user data is fetched
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate(); // For redirection

  // ✅ Fetch User
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/checkauth", {
          withCredentials: true, // Ensures cookies are sent
        });
  
        console.log(response.data.user); // Debugging: Check the received user object
        setUser(response.data.user); // Store the full user object
  
        // Ensure `userId` is set in formData
        setFormData((prevData) => ({
          ...prevData,
          userId: response.data.user._id, // ✅ Use `userId` instead of `id`
        }));
      } catch (err) {
        console.error("Authentication error:", err);
        setError("You need to be logged in to view this page.");
        navigate("/login");
      }
    };
  
    fetchUser();
  }, [navigate]);
  

  // ✅ Fetch Doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/users?role=doctor");
        setDoctors(data.data || []);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setDoctors([]);
      }
    };

    fetchDoctors();
  }, []); // Doctors fetch only once on mount

  // ✅ Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // ✅ Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!user || !user._id) {
      alert("User not authenticated! Please log in.");
      return;
    }
  
    const updatedFormData = {
      ...formData,
      userId: user._id, // ✅ Ensure `id` is included before sending request
    };
  
    console.log("Submitting data:", updatedFormData); // Debugging step
  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/appointments",
        updatedFormData
      );
      console.log("Appointment booked:", response.data);
  
      setFormData({
        firstName: "",
        lastName: "",
        consultationType: "",
        phone: "",
        doctor: "",
        date: "",
        time: "",
        symptoms: "",
        id: "", // Reset `id`
      });
  
      alert("Appointment booked successfully!");
    } catch (error) {
      console.error("Error booking appointment:", error.response?.data || error);
      alert("Error booking appointment, please try again.");
    }
  };
  

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Get in Touch Section */}
        <div className="w-full animate__animated animate__fadeInLeft">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gray-100 py-5 px-6">
              <h3 className="text-emerald-500 text-2xl font-bold">Get in Touch</h3>
              <p className="text-black/60 font-semibold text-md">
                We're here to assist you 24/7
              </p>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-emerald-100 rounded-full p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-emerald-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    ></path>
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-neutral-800">
                    Phone Support
                  </h4>
                  <a
                    href="tel:+918435304050"
                    className="text-emerald-600 font-medium block hover:text-emerald-700 transition"
                  >
                    +91 8435304050
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-emerald-100 rounded-full p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-emerald-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-neutral-800">
                    Email
                  </h4>
                  <a
                    href="mailto:support@healthaiplus.com"
                    className="text-emerald-600 font-medium block hover:text-emerald-700 transition"
                  >
                    pardeshianurag22@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-emerald-100 rounded-full p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-emerald-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    ></path>
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-neutral-800">
                    Office Address
                  </h4>
                  <p className="text-neutral-600">Indore, Madhya Pradesh</p>
                </div>
              </div>
            </div>
            <div className="p-6 pt-0">
              <h4 className="text-lg font-medium text-neutral-800 mb-4">
                Connect With Us
              </h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="bg-emerald-100 hover:bg-emerald-200 text-emerald-600 p-3 rounded-full transition duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="bg-emerald-100 hover:bg-emerald-200 text-emerald-600 p-3 rounded-full transition duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="bg-emerald-100 hover:bg-emerald-200 text-emerald-600 p-3 rounded-full transition duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="bg-emerald-100 hover:bg-emerald-200 text-emerald-600 p-3 rounded-full transition duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Request Appointment Section */}
        <div className="w-full bg-white rounded-xl shadow-md overflow-hidden animate__animated animate__fadeInLeft">
          <div className="bg-gray-100 py-5 px-6">
            <h3 className="text-emerald-500 text-2xl font-bold">
              Request Appointment
            </h3>
            <p className="text-black/60 font-semibold text-md">
              Fill in your details to schedule a consultation
            </p> <span className="text-sm text-emerald-500 hover:underline hover:cursor-pointer"><a href="/dashboard">view all appointments</a></span>
          </div>
          <form className="p-6 space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-neutral-700 mb-1"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="first-name"
                  name="firstName"
                  className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:border-transparent transition"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-neutral-700 mb-1"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="last-name"
                  name="lastName"
                  className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:border-transparent transition"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="consultation-type"
                  className="block text-sm font-medium text-neutral-700 mb-1"
                >
                  Consultation Type
                </label>
                <select
                  id="consultation-type"
                  name="consultationType"
                  className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:border-transparent transition"
                  value={formData.consultationType}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select consultation type
                  </option>
                  <option value="general">General Consultation</option>
                  <option value="specialist">Specialist Consultation</option>
                  <option value="follow-up">Follow-up Visit</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-neutral-700 mb-1"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:border-transparent transition"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="userID"
                  className="block text-sm font-medium text-neutral-700 mb-1"
                >
                  UserID
                </label>
                {user ? (
                  <input
                    type="text"
                    id="userID"
                    name="id"
                    className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:border-transparent transition"
                    value={user._id}
                    readOnly
                  />
                ) : (
                  <p>Loading user...</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="doctor"
                  className="block text-sm font-medium text-neutral-700 mb-1"
                >
                  Select Doctor
                </label>
                {doctors.length > 0 ? (
                  <select
                    id="doctor"
                    name="doctor"
                    className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:border-transparent transition"
                    value={formData.doctor}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Choose a healthcare professional
                    </option>
                    {doctors.map((user) => (
                      <option key={user._id} value={user.name}>
                        {user.name} - {user.specialization}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p>No doctors found</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-neutral-700 mb-1"
                >
                  Preferred Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:border-transparent transition"
                  min="2025-03-12"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="time"
                  className="block text-sm font-medium text-neutral-700 mb-1"
                >
                  Preferred Time
                </label>
                <select
                  id="time"
                  name="time"
                  className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:border-transparent transition"
                  value={formData.time}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select a time slot
                  </option>
                  <option value="09:00">09:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="13:00">01:00 PM</option>
                  <option value="14:00">02:00 PM</option>
                  <option value="15:00">03:00 PM</option>
                  <option value="16:00">04:00 PM</option>
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="symptoms"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Brief Description of Symptoms
              </label>
              <textarea
                id="symptoms"
                name="symptoms"
                rows="3"
                className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:border-transparent transition"
                placeholder="Please briefly describe your symptoms or reason for consultation"
                value={formData.symptoms}
                onChange={handleChange}
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-6 rounded-md transition duration-300 font-medium"
              >
                Confirm Appointment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
