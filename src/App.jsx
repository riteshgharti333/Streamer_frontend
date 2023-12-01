import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import Subscriptions from "./pages/Subscriptions/Subscriptions";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { Toaster } from "react-hot-toast";
import Watch from "./pages/Watch/Watch";


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Homepage type="series" />} />
      <Route path="/" element={<Homepage type="movies" />} />
      <Route path="/movies" element={<Homepage type="movie"/>} />
      <Route path="/series" element={<Homepage type="series" />} />
      <Route path="/movies/:id" element={<Watch />} />
      <Route path="/subscriptions" element={<Subscriptions />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />;
      <Toaster />
    </>
  );
}

export default App;
