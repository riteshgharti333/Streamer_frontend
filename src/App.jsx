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
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer/Footer";
import UpdatePassword from "./pages/UpdatePassword/UpdatePassword";
import SuccessPage from "./pages/SuccessPage/SuccessPage";
import CancelPage from "./pages/CancelPage/CancelPage";

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

  const ProtectedRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  const hideNavbarFooter =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/success" ||
    location.pathname === "/cancel";

  return (
    <div className="app">
      {!hideNavbarFooter && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Homepage type="series" />} />
        <Route path="/movies" element={<Homepage type="movies" />} />
        <Route path="/series" element={<Homepage type="series" />} />
        <Route path="/movies/:id" element={<Watch />} />
        <Route path="/query" element={<QueryMovies />} />
        <Route path="/subscriptions" element={<Subscriptions />} />

        <Route
          path="/updatepassword"
          element={
            <ProtectedRoute>
              <UpdatePassword />
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

        {/* <Route path="*" element={<Navigate to="/" />} /> */}
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelPage />} />
      </Routes>

      {!hideNavbarFooter && <Footer />}
    </div>
  );
}

export default App;
