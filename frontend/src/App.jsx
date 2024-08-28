import {
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from 'react-router-dom'

// Layouts and Components
import MainLayout from './Layouts/MainLayout'
import SidebarLayout from './Layouts/SidebarLayout' // Layout with Sidebar
import PrivateRoute from './Components/PrivateRoute'

// Customer Pages
import HomePage from './Pages/HomePage'
import NotFound from './Pages/NotFound'
import Login from './Pages/Customer/LoginForm'
import Register from './Pages/Customer/RegisterForm'
// import UserProfile from './Pages/Customer/UserProfile';
import VerifyEmail from './Pages/Customer/VerifyEmail'
import CheckEmail from './Pages/Customer/CheckEmail'
import ForgotPassword from './Pages/Customer/ForgotPassword'
import ResetPassword from './Pages/Customer/PasswordReset'
import UserDashboard from './Pages/Customer/UserDashboard'
import Settings from './Pages/Customer/Settings'
import UserAllOrders from './Pages/Customer/UserAllOrders'
import BillingAddress from './Pages/Customer/address'

// Shop/Farmer Pages
import FarmerLogin from './Pages/farmer/FarmerLogin'
import FarmerDashboard from './Pages/farmer/FarmerDashboard'
import ProfilePage from './Pages/farmer/FarmerProfile'
import FarmerLogout from './Pages/farmer/LogOut'
import FarmerRegister from './Pages/farmer/FarmerRegistration'
import MyShop from './Pages/farmer/Myshops'
import AddShop from './Pages/farmer/shopcreate'
import Shop from './Pages/farmer/ShopDashboard'
import ShopProfile from './Pages/farmer/shopProfile'
import Products from './Pages/farmer/products'
import AddProduct from './Pages/farmer/addProduct'
import UpdateProduct from './Pages/farmer/UpdateProduct'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />

            {/* Customer Routes without Sidebar */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-pass" element={<ResetPassword />} />
            <Route path="/checkEmail" element={<CheckEmail />} />
            <Route path="/verifyEmail" element={<VerifyEmail />} />

            {/* Customer Routes with Sidebar */}
            <Route element={<SidebarLayout />}>
                <Route path="/userDashboard" element={<UserDashboard />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/orderhistory" element={<UserAllOrders />} />
                <Route path="/address" element={<BillingAddress />} />
            </Route>

            {/* Shop & Farmer Routes */}
            <Route path="/farmerLogin" element={<FarmerLogin />} />
            <Route path="/farmerRegister" element={<FarmerRegister />} />
            <Route path="/farmerdashboard" element={<FarmerDashboard />} />
            <Route path="/farmerprofile" element={<ProfilePage />} />
            <Route path="/myshops" element={<MyShop />} />
            <Route path="/shopcreate" element={<AddShop />} />
            <Route path="/shop/:id" element={<Shop />} />
            <Route path="/shop/profile" element={<ShopProfile />} />
            <Route path="/shop/:id/productpage" element={<Products />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/updateproduct" element={<UpdateProduct />} />
            <Route path="/logout" element={<FarmerLogout />} />
            <Route path="*" element={<NotFound />} />
        </Route>
    )
)

const App = () => {
    return <RouterProvider router={router}></RouterProvider>
}

export default App
