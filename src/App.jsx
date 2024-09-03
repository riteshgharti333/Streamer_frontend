import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import Subscriptions from "./pages/Subscriptions/Subscriptions";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { Toaster } from "react-hot-toast";
// import Watch from "./pages/Watch/Watch";
import Profile from "./pages/Profile/Profile";
import QueryMovies from "./pages/QueryMovies/QueryMovies";
import Navbar from "./components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";

function App() {

  

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth)

  // console.log(user);

  return (
    <div className="app">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Homepage type="series" />} />
          <Route path="/movies" element={<Homepage type="movies" />} />
          <Route path="/series" element={<Homepage type="series" />} />
          {/* <Route path="/movies/:id" element={<Watch />} /> */}
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/query" element={<QueryMovies />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
      <Toaster />
    </div>
  );
}

export default App;
