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

  const [selectedDate, setSelectedDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  const [error, setError] = useState(null);
  const navigate = useNavigate(); // For redirection

  // ✅ Fetch User
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://medi-care-tr9j.vercel.app/api/auth/checkauth",
          {
            withCredentials: true, // Ensures cookies are sent
          }
        );
    
        const user = response.data.user;
    
        if (!user) {
          throw new Error("User not found");
        }
    
        console.log(user); // Debugging: Check the received user object
        setUser(user); // Store the full user object
    
        // Ensure `userId` is set in formData
        setFormData((prevData) => ({
          ...prevData,
          userId: user._id, // ✅ Use `userId` instead of `id`
        }));
      } catch (err) {
        console.error("Authentication error:", err);
        setError("You need to be logged in to view this page.");
        navigate("/login");
      }
    };
    

    fetchUser();
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    setCurrentTime(`${hours}:${minutes < 10 ? "0" + minutes : minutes}`);
  }, [navigate]);

  const timeSlots = [
    { value: "09:00", label: "09:00 AM" },
    { value: "10:00", label: "10:00 AM" },
    { value: "11:00", label: "11:00 AM" },
    { value: "12:00", label: "12:00 PM" },
    { value: "13:00", label: "01:00 PM" },
    { value: "14:00", label: "02:00 PM" },
    { value: "15:00", label: "03:00 PM" },
    { value: "16:00", label: "04:00 PM" },
  ];

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "https://medi-care-tr9j.vercel.app/api/users?role=doctor"
        );
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
    setSelectedDate(e.target.value);
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
        "https://medi-care-tr9j.vercel.app/api/appointments",
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
      console.error(
        "Error booking appointment:",
        error.response?.data || error
      );
      alert("Error booking appointment, please try again.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Get in Touch Section */}
        <div className="w-full animate__animated animate__fadeInLeft">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gray-100 py-5 px-6">
              <h3 className="text-emerald-500 text-2xl font-bold">
                Get in Touch
              </h3>
              <p className="text-black/60 font-semibold text-md">
                We're here to assist you 24/7
              </p>
            </div>
            <div className="p-6 space-y-6">
              {/* Phone Support */}
              <div className="flex flex-col sm:flex-row items-start">
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
                <div className="mt-4 sm:mt-0 sm:ml-4">
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

              {/* Email */}
              <div className="flex flex-col sm:flex-row items-start">
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
                <div className="mt-4 sm:mt-0 sm:ml-4">
                  <h4 className="text-lg font-medium text-neutral-800">
                    Email
                  </h4>
                  <a
                    href="mailto:support@healthaiplus.com"
                    className="text-emerald-600 font-medium block hover:text-emerald-700 transition"
                  >
                    xyz@gmail.com
                  </a>
                </div>
              </div>

              {/* Office Address */}
              <div className="flex flex-col sm:flex-row items-start">
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
                <div className="mt-4 sm:mt-0 sm:ml-4">
                  <h4 className="text-lg font-medium text-neutral-800">
                    Office Address
                  </h4>
                  <p className="text-neutral-600">Indore, Madhya Pradesh</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Request Appointment Section */}
        <div className="w-full bg-white rounded-xl col-span-2 shadow-md overflow-hidden animate__animated animate__fadeInLeft">
          <div className="bg-gray-100 py-5 px-6">
            <h3 className="text-emerald-500 text-2xl font-bold">
              Request Appointment
            </h3>
            <p className="text-black/60 font-semibold text-md">
              Fill in your details to schedule a consultation
            </p>{" "}
            <span className="text-sm text-emerald-500 font-bold hover:underline hover:cursor-pointer">
              <a href="/dashboard">view all appointments</a>
            </span>
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
                  min={new Date().toISOString().split("T")[0]}
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
                  {timeSlots.map((slot) => {
                    const isPast = slot.value < currentTime;
                    return (
                      <option
                        key={slot.value}
                        value={slot.value}
                        disabled={isPast}
                      >
                        {slot.label}
                      </option>
                    );
                  })}
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
