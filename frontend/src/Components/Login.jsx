import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Redirect if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("https://medi-care-tr9j.vercel.app/api/auth/checkauth", {
          withCredentials: true,
        });

        if (res.data?.user) {
          // Redirect based on role
          if (res.data.user.role === "patient") {
            navigate("/dashboard");
          } else if (res.data.user.role === "doctor") {
            navigate("/doctor");
          }
        }
      } catch (err) {
        console.log("User not logged in, continue to login page.");
      }
    };

    checkAuth();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    try {
      const res = await axios.post("https://medi-care-tr9j.vercel.app/api/auth/login", formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, // ✅ Ensures cookies are included
      });

      console.log("Login Successful:", res.data);
      alert("Login Successful");

      // Redirect user based on role
      if (res.data?.user?.role === "patient") {
        navigate("/dashboard"); // Patient dashboard
      } else if (res.data?.user?.role === "doctor") {
        navigate("/doctor"); // Doctor dashboard
      } else {
        alert("Invalid user role");
      }
    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      setError(err.response?.data?.errors[0]?.msg || "An error occurred");
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
      <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl max-md:max-w-md w-full">
        <div>
          <h2 className="lg:text-5xl text-3xl font-bold lg:leading-[57px] text-slate-900">
            Seamless Login for Exclusive Access
          </h2>
          <p className="text-sm mt-6 text-slate-500 leading-relaxed">
            Immerse yourself in a hassle-free login journey with our intuitively designed login form.
          </p>
          <p className="text-sm mt-2 text-slate-500">
            Don't have an account?{" "}
            <a href="/register" className="text-emerald-600 font-medium hover:underline ml-1">
              Register here
            </a>
          </p>
        </div>

        <form className="max-w-md md:ml-auto w-full" onSubmit={handleSubmit}>
          <h3 className="text-slate-900 lg:text-3xl text-2xl font-bold mb-8">Log in</h3>

          <div className="space-y-6">
            <div>
              <label className="text-sm text-slate-800 font-medium mb-2 block">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-slate-100 w-full text-sm text-slate-800 px-4 py-3 rounded-md outline-none shadow-sm focus:border-emerald-600 focus:bg-transparent"
                placeholder="Enter Email"
              />
            </div>

            <div>
              <label className="text-sm text-slate-800 font-medium mb-2 block">Password</label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="bg-slate-100 w-full text-sm text-slate-800 px-4 py-3 rounded-md outline-none shadow-sm focus:border-emerald-600 focus:bg-transparent"
                placeholder="Enter Password"
              />
            </div>
          </div>

          {error && <p className="text-red-500 mt-2">{error}</p>} {/* Show error */}

          <div className="!mt-12">
            <button
              type="submit"
              className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none"
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
