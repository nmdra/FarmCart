import {
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import HomePage from "./Pages/HomePage";
import NotFound from "./Pages/NotFound";
import Login from "./Pages/LoginForm"
import Register from "./Pages/RegisterForm"
import UserProfile from "./Pages/UserProfile";
import PrivateRoute from "./Components/PrivateRoute";

const router = createBrowserRouter(
    
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<PrivateRoute />}>
          <Route path="" element={<UserProfile />} />
        </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;

