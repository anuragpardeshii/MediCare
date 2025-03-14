import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Fetch user info
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://medi-care-dds6.vercel.app/api/auth/checkauth",
          { withCredentials: true }
        );
<<<<<<< HEAD

        if (response.data.user) {
          const { role } = response.data.user;

          if (role !== "patient") {
            navigate("/doctor"); // Redirect if not a doctor
            return;
          }

          setUser(response.data.user);
          console.log("User fetched:", response.data.user); // Debugging
=======
        if (response.data.user) {
          setUser(response.data.user);
>>>>>>> 9e1fffad1457eedf5f0f4d7ad67e6ac99cf705eb
        }
      } catch (err) {
        setError("You need to be logged in to view this page.");
        navigate("/login");
<<<<<<< HEAD
      } finally {
        setLoading(false);
=======
>>>>>>> 9e1fffad1457eedf5f0f4d7ad67e6ac99cf705eb
      }
    };

    fetchUser();
  }, [navigate]);

  // Fetch Appointments AFTER user is loaded
  useEffect(() => {
    if (!user) return; // Wait until user is set

    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          "https://medi-care-dds6.vercel.app/api/appointments"
        );
        const allAppointments = response.data;

        console.log("Fetched Appointments:", allAppointments);

        // ✅ Filter appointments for logged-in user
        const userAppointments = allAppointments.filter(
          (appointment) => appointment.userId === user._id
        );

        setAppointments(userAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setError("Failed to load appointments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user]); // Run only when user is available

  if (loading) return <p>Loading appointments...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto m-4">
      <h3 className="text-4xl font-bold m-4 my-8 text-center">
        Welcome{" "}
<<<<<<< HEAD
        <span className="text-emerald-500">
          {user ? user.name : "Guest (demo)"}
        </span>
      </h3>
      <div className="border-b-1 border-gray-200 mb-8"></div>

      <div className="my-4 mx-4 grid grid-cols-1 md:grid-cols-6 gap-4">
        {/* Book Appointments Section - Full width on mobile, spans 2 columns on larger screens */}
        <div className="md:col-span-2">
          <h3 className="mb-4 pb-2 text-2xl font-bold tracking-tight text-gray-900 border-b border-gray-200">
            Book Appointments
          </h3>
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
=======
        <span className="text-emerald-500">{user ? user.name : "Guest"}</span>
      </h3>
      <div className="border-b-1 border-gray-200 mb-8"></div>

      <div className="my-4 flex flex-row gap-4 items-start mx-4">
        <div className="min-w-xs">
          <h3 className="mb-4 pb-2 text-2xl font-bold tracking-tight text-gray-900 border-b-1 border-gray-200">
            Book Appointments
          </h3>
          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm">
>>>>>>> 9e1fffad1457eedf5f0f4d7ad67e6ac99cf705eb
            <div className="p-5">
              <p className="mb-4 font-semibold text-gray-500">
                Skip the wait! Book your doctor’s appointment online in seconds.
              </p>
              <a
                href="/book"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300"
              >
                Book now
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

<<<<<<< HEAD
        {/* Your Appointments Section - Full width on mobile, spans 3 columns on larger screens */}
        <div className="md:col-span-4 overflow-x-auto">
          <h3 className="mb-4 pb-2 text-2xl font-bold tracking-tight text-gray-900 border-b border-gray-200">
=======
        <div className="w-full overflow-x-auto">
          <h3 className="mb-4 pb-2 text-2xl font-bold tracking-tight text-gray-900 border-b-1 border-gray-200">
>>>>>>> 9e1fffad1457eedf5f0f4d7ad67e6ac99cf705eb
            Your Appointments
          </h3>

          <div className="rounded-lg border border-gray-200 shadow-lg">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
<<<<<<< HEAD
                  <th className="px-4 py-3">Doctor</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Time</th>
=======
                  <th className="px-6 py-3">Doctor</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Time</th>
>>>>>>> 9e1fffad1457eedf5f0f4d7ad67e6ac99cf705eb
                </tr>
              </thead>
              <tbody>
                {appointments.length > 0 ? (
                  appointments.map((appointment) => (
                    <tr
                      key={appointment._id}
                      className="bg-white border-b border-gray-200"
                    >
<<<<<<< HEAD
                      <td className="px-4 py-4 font-medium text-gray-900">
                        Dr. {appointment.doctor}
                      </td>
                      <td className="px-4 py-4">
=======
                      <td className="px-6 py-4 font-medium text-gray-900">
                  Dr. {appointment.doctor}
                      </td>
                      <td className="px-6 py-4">
>>>>>>> 9e1fffad1457eedf5f0f4d7ad67e6ac99cf705eb
                        {appointment.date
                          ? new Date(appointment.date).toLocaleDateString()
                          : "N/A"}
                      </td>
<<<<<<< HEAD
                      <td className="px-4 py-4">{appointment.time || "N/A"}</td>
=======
                      <td className="px-6 py-4">{appointment.time || "N/A"}</td>
>>>>>>> 9e1fffad1457eedf5f0f4d7ad67e6ac99cf705eb
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="3"
<<<<<<< HEAD
                      className="px-4 py-4 text-center text-gray-500"
=======
                      className="px-6 py-4 text-center text-gray-500"
>>>>>>> 9e1fffad1457eedf5f0f4d7ad67e6ac99cf705eb
                    >
                      No appointments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
