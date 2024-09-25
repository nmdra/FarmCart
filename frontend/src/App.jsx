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
import MembershipUpgrade from './Pages/Customer/MembershipUpgrade'
import OrderStatus from './Pages/Customer/OrderStatus'
import Address from './Components/Address'
import PaymentConfirmation from './Pages/Customer/PaymentConfirmation'
import PaymentComplete from './Pages/Customer/PaymentComplete'

// Shop/Farmer Pages
import FarmerLogin from './Pages/farmer/FarmerLogin'
import FarmerDashboard from './Pages/farmer/FarmerDashboard'
import ProfilePage from './Pages/farmer/FarmerProfile'
import FarmerLogout from './Pages/farmer/FarmerLogOut'
import FarmerRegister from './Pages/farmer/FarmerRegistration'
import MyShop from './Pages/farmer/Myshops'
import AddShop from './Pages/farmer/shopcreate'
import Shop from './Pages/farmer/ShopDashboard'
import ShopProfile from './Pages/farmer/shopProfile'
import Products from './Pages/farmer/products'
import AddProduct from './Pages/farmer/addProduct'
import UpdateProduct from './Pages/farmer/UpdateProduct'
import ShopList from './Pages/Shop/ShopList'
import ShopPage from './Pages/Shop/ShopPage'
import ProductPage from './Pages/Shop/ProductPage'
import Cart from './Pages/order/Cart'
import CheckOut from './Pages/order/checkOut'

//Admin
import DashboardLayout from './Components/Admin/DashboardLayout';
import CustomerPage from './Components/Admin/CustomerPage';
import StaffPage from './Components/Admin/StaffPage';
import PromotionPage from './Components/Admin/PromotionPage';
import FinancialAnalysisPage from './Components/Admin/FinancialAnalysisPage';
import CreateStaff from './Components/Admin/AdminCreateStaffPage';
import CreateCustomer from './Components/Admin/AdminCreateCustomerPage';

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
            <Route path="/address" element={<Address />} />

            <Route element={<PrivateRoute />}>
                {/* Customer Routes with Sidebar */}
                <Route element={<SidebarLayout />}>
                    <Route path="/userDashboard" element={<UserDashboard />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/orderhistory" element={<UserAllOrders />} />
                    <Route path="/orderStatus" element={<OrderStatus />} />
                    {/* <Route path="/address" element={<BillingAddress />} /> */}
                    <Route path="/membership" element={<MembershipUpgrade />} />
                    <Route
                        path="/payment-confirmation"
                        element={<PaymentConfirmation />}
                    />
                    <Route
                        path="/paymentComplete"
                        element={<PaymentComplete />}
                    />
                </Route>
            </Route>

            {/* Product Listing */}
            <Route path="/shops" element={<ShopList />} />
            <Route path="/shops/:id" element={<ShopPage />} />
            <Route
                path="/shops/:id/product/:productId"
                element={<ProductPage />}
            />

            <Route path="/cart" element={<Cart />} />
            <Route path="/checkOut" element={<CheckOut />} />

            {/* Shop & Farmer Routes */}
            <Route path="/farmerLogin" element={<FarmerLogin />} />
            <Route path="/farmerRegister" element={<FarmerRegister />} />
            <Route path="/farmerdashboard" element={<FarmerDashboard />} />
            <Route path="/farmerprofile" element={<ProfilePage />} />
            <Route path="/myshops" element={<MyShop />} />
            <Route path="/shopcreate" element={<AddShop />} />
            <Route path="/farmerShop/:id" element={<Shop />} />
            <Route path="/farmerShop/profile" element={<ShopProfile />} />
            <Route path="/farmerShop/:id/productpage" element={<Products />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/updateproduct" element={<UpdateProduct />} />
            <Route path="/farmerlogout" element={<FarmerLogout />} />

            <Route path="/Admindashboard" element={<DashboardLayout />}/>
            <Route path="/Admindashboard/customer" element={<CustomerPage />} />
            <Route path="/Admindashboard/staff" element={<StaffPage />} />
            <Route path="/Admindashboard/offers" element={<PromotionPage />} />
            <Route path="/Admindashboard/financial-analysis" element={<FinancialAnalysisPage />} />
            <Route path="/Admindashboard/staff/create" element={<CreateStaff />} /> {/* Updated path */}
            <Route path="/Admindashboard/Customer/create" element={<CreateCustomer />} />

            <Route path="*" element={<NotFound />} />
        </Route>
    )
)
const App = () => {
    return <RouterProvider router={router}></RouterProvider>
}

export default App
