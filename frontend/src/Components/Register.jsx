import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
    specialization: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "role" && value === "patient") {
      setFormData({ ...formData, role: value, specialization: "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      alert("All fields are required!");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", formData);
      console.log("Registration Successful", res.data);
      alert("Registration successful!");
      
      // Redirect to login page after successful registration
      navigate("/login");
    } catch (err) {
      console.error("Registration Error", err.response?.data || err.message);
      alert(err.response?.data?.errors[0]?.msg || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
      <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl max-md:max-w-md w-full">
        <div>
          <h2 className="lg:text-5xl text-3xl font-bold lg:leading-[57px] text-slate-900">
            Seamless Registration for Exclusive Access
          </h2>
          <p className="text-sm mt-6 text-slate-500 leading-relaxed">
            Join our platform with a simple and intuitive registration process.
          </p>
          <p className="text-sm mt-2 text-slate-500">
            Already have an account?{" "}
            <a href="/login" className="text-emerald-600 font-medium hover:underline ml-1">
              Login here
            </a>
          </p>
        </div>

        <form className="max-w-md md:ml-auto w-full" onSubmit={handleSubmit}>
          <h3 className="text-slate-900 lg:text-3xl text-2xl font-bold mb-8">Sign in</h3>
          <div className="space-y-6">
            <input
              className="bg-slate-100 shadow-sm w-full text-sm text-slate-800 px-4 py-3 rounded-md outline-none focus:border-emerald-600 focus:bg-transparent"
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />

            <input
              className="bg-slate-100 shadow-sm w-full text-sm text-slate-800 px-4 py-3 rounded-md outline-none focus:border-emerald-600 focus:bg-transparent"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />

            <input
              className="bg-slate-100 shadow-sm w-full text-sm text-slate-800 px-4 py-3 rounded-md outline-none focus:border-emerald-600 focus:bg-transparent"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />

            <select
              className="bg-slate-100 shadow-sm w-full text-sm text-slate-800 px-4 py-3 rounded-md outline-none focus:border-emerald-600 focus:bg-transparent"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>

            {formData.role === "doctor" && (
              <input
                className="bg-slate-100 shadow-sm w-full text-sm text-slate-800 px-4 py-3 rounded-md outline-none focus:border-emerald-600 focus:bg-transparent"
                type="text"
                name="specialization"
                placeholder="Specialization"
                value={formData.specialization}
                onChange={handleChange}
              />
            )}

            <button className="w-full p-2 bg-emerald-500 text-white rounded-md">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
