import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import Subscriptions from "./pages/Subscriptions/Subscriptions";
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import { Toaster } from "react-hot-toast";
import Watch from "./pages/Watch/Watch";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage type="movie"/>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/movies",
    element: <Homepage type="movie" />,
  },
  {
    path: "/series",
    element: <Homepage  type="series"  />,
  },
  {
    path: "/movies/:id",
    element: <Watch />,
  },
  {
    path: "/subscriptions",
    element: <Subscriptions />,
  },
]);

function App() {
  return (
<>
<RouterProvider router={router} />;
   <Toaster />
</>
  
  )
}

export default App;
