import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./Home/Navbar";
import Home from "./Home/Home";
import Login from "./Components/Login";
import { AuthProvider } from "./Context/AuthContext";
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard";
import Doctors from "./Components/Doctors";
import "flowbite";
import Book from "./Components/Book";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </Router>
  );
};

const MainApp = () => {
  const location = useLocation();

  // Define paths where the Navbar should not be displayed
  const hideNavbarRoutes = ["/login", "/register"];
  
  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/doctor" element={<Doctors />} />
        <Route path="/book" element={<Book />} />
      </Routes>
    </>
  );
};

export default App;
