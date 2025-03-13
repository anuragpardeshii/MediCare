import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function Doctors() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Fetch user info
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/checkauth",
          { withCredentials: true }
        );
        if (response.data.user) {
          setUser(response.data.user);
          console.log("User fetched:", response.data.user); // Debugging
        }
      } catch (err) {
        setError("You need to be logged in to view this page.");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  useEffect(() => {
    if (!user) return; // Don't fetch if user is not set

    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/appointments"
        );
        setAppointments(response.data);
        console.log("Appointments fetched:", response.data); // Debugging
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    const fetchPatients = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/users?role=patient"
        );
        setPatients(data.data || []);
        console.log("Patients fetched:", data.data); // Debugging
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/users?role=doctor"
        );
        setDoctors(data.data || []);
        console.log("Doctors fetched:", data.data); // Debugging
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchPatients();
    fetchDoctors();
    fetchAppointments();
  }, [user]); // Run this only when `user` is set

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      setPatients(patients.filter((user) => user._id !== id));
      setDoctors(doctors.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/appointments/${appointmentId}`
      );

      setAppointments(
        appointments.filter((appt) => appt._id !== appointmentId)
      );

      alert("Appointment canceled successfully.");
    } catch (error) {
      console.error("Error canceling appointment:", error);
      alert("Failed to cancel appointment.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto mx-4">
      <h3 className="text-4xl font-bold m-4 my-8 text-center">
        Welcome{" "}
        <span className="text-emerald-500">
          Dr. {user ? user.name : "Guest"}
        </span>
      </h3>
      <div className="border-b-1 border-gray-200 mb-8"></div>
      <div className="mb-4 border-b border-gray-200">
        <ul
          className="flex flex-wrap -mb-px text-sm font-medium text-center"
          id="default-tab"
          data-tabs-toggle="#default-tab-content"
          role="tablist"
        >
          <li className="me-2" role="presentation">
            <button
              className="inline-block p-4 border-b-2 rounded-t-lg"
              id="profile-tab"
              data-tabs-target="#profile"
              type="button"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
            >
              Appointments
            </button>
          </li>
          <li className="me-2" role="presentation">
            <button
              className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300"
              id="dashboard-tab"
              data-tabs-target="#dashboard"
              type="button"
              role="tab"
              aria-controls="dashboard"
              aria-selected="false"
            >
              All users
            </button>
          </li>
        </ul>
      </div>

      <div id="default-tab-content">
        <div
          className="hidden "
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          <h3 className="text-lg m-2 font-semibold text-gray-700">
            Your Appointments
          </h3>
          <div className="rounded-lg border border-gray-200">
            <table className="w-full text-sm text-left rtl:text-right rounded-lg text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Patient Name
                  </th>
                  <th scope="col" className="px-6 py-3 hidden md:table-cell">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3 hidden md:table-cell">
                    Doctor
                  </th>
                  <th scope="col" className="px-6 py-3 hidden lg:table-cell">
                    Consultation
                  </th>
                  <th scope="col" className="px-6 py-3 hidden md:table-cell">
                    Phone
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Time
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Edit
                  </th>
                </tr>
              </thead>
              <tbody>
                {appointments.length > 0 &&
                appointments.some(
                  (appointment) => user && appointment.doctor === user.name
                ) ? (
                  appointments
                    .filter(
                      (appointment) => user && appointment.doctor === user.name
                    )
                    .map((appointment) => (
                      <tr
                        key={appointment._id}
                        className="bg-white border-b border-gray-200"
                      >
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          {appointment.firstName} {appointment.lastName}
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell">
                          {appointment.symptoms || "No symptoms provided"}
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell">
                          {appointment.doctor}
                        </td>
                        <td className="px-6 py-4 hidden lg:table-cell">
                          {appointment.consultationType}
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell">
                          {appointment.phone}
                        </td>
                        <td className="px-6 py-4">
                          {new Date(appointment.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">{appointment.time}</td>
                        <td className="px-6 py-4 text-red-600 font-medium">
                          <button
                            className="hover:underline"
                            onClick={() => cancelAppointment(appointment._id)}
                          >
                            Cancel
                          </button>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No appointments yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <br />

          <h3 className="text-lg m-2 font-semibold text-gray-700">
            All Appointments
          </h3>

          <div className="rounded-lg border border-gray-200">
            <table className="w-full text-sm text-left rtl:text-right rounded-lg text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Patient Name
                  </th>
                  <th scope="col" className="px-6 py-3 hidden md:table-cell">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3 hidden md:table-cell">
                    Doctor
                  </th>
                  <th scope="col" className="px-6 py-3 hidden lg:table-cell">
                    Consultation
                  </th>
                  <th scope="col" className="px-6 py-3 hidden md:table-cell">
                    Phone
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Time
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Edit
                  </th>
                </tr>
              </thead>
              <tbody>
                {appointments.length > 0 ? (
                  appointments.map((appointment) => (
                    <tr
                      key={appointment._id}
                      className="bg-white border-b border-gray-200"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {appointment.firstName} {appointment.lastName}
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        {appointment.symptoms || "No symptoms provided"}
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        {appointment.doctor}
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell">
                        {appointment.consultationType}
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        {appointment.phone}
                      </td>
                      <td className="px-6 py-4">
                        {new Date(appointment.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">{appointment.time}</td>
                      <td className="px-6 py-4 text-red-600 font-medium">
                        <button
                          className="hover:underline"
                          onClick={() => cancelAppointment(appointment._id)}
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No appointments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div
          className="hidden rounded-lg"
          id="dashboard"
          role="tabpanel"
          aria-labelledby="dashboard-tab"
        >
          <div className="w-full overflow-x-auto">
            <h3 className="mb-4 pb-2 text-2xl font-bold tracking-tight text-gray-900 border-b-1 border-gray-200">
              All users
            </h3>

            {/* All users  */}
            <div className="space-y-8">
              {/* Patients Table */}
              <div className="rounded-lg border border-gray-200">
                <h2 className="text-lg font-semibold p-4">Patients</h2>
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th className="px-6 py-3">Patient Name</th>
                      <th className="px-6 py-3">Email</th>
                      <th className="px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.length > 0 ? (
                      patients.map((user) => (
                        <tr
                          key={user._id}
                          className="bg-white border-b border-gray-200"
                        >
                          <td className="px-6 py-4 font-medium text-gray-900">
                            {user.name}
                          </td>
                          <td className="px-6 py-4">{user.email}</td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => deleteUser(user._id)}
                              className="text-red-500 font-medium"
                            >
                              Delete User
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="px-6 py-4 text-center">
                          No patients found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Doctors Table */}
              <div className="rounded-lg mb-8 border border-gray-200">
                <h2 className="text-lg font-semibold p-4">Doctors</h2>
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th className="px-6 py-3">Doctor Name</th>
                      <th className="px-6 py-3">Email</th>
                      <th className="px-6 py-3">Specialisation</th>
                      <th className="px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doctors.length > 0 ? (
                      doctors.map((user) => (
                        <tr
                          key={user._id}
                          className="bg-white border-b border-gray-200"
                        >
                          <td className="px-6 py-4 font-medium text-gray-900">
                            {user.name}
                          </td>
                          <td className="px-6 py-4">{user.email}</td>
                          <td className="px-6 py-4">{user.specialization}</td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => deleteUser(user._id)}
                              className="text-red-500 font-medium"
                            >
                              Delete User
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="px-6 py-4 text-center">
                          No doctors found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
