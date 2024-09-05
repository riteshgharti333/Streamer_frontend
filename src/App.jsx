import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import Subscriptions from "./pages/Subscriptions/Subscriptions";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Watch from "./pages/Watch/Watch";
import Profile from "./pages/Profile/Profile";
import QueryMovies from "./pages/QueryMovies/QueryMovies";
import Navbar from "./components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Layout />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>
  );
}

function Layout() {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  // Protected route function to prevent access without authentication
  const ProtectedRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  // Hide Navbar on specific routes
  const hideNavbar = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="app">
      {/* Conditionally render Navbar based on the current route */}
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Homepage type="series" />} />
        <Route path="/movies" element={<Homepage type="movies" />} />
        <Route path="/series" element={<Homepage type="series" />} />
        <Route path="/movies/:id" element={<Watch />} />
        <Route path="/query" element={<QueryMovies />} />

        {/* Protected routes */}
        <Route
          path="/subscriptions"
          element={
            <ProtectedRoute>
              <Subscriptions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Fallback route for non-existent paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
