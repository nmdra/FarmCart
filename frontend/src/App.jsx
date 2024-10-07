import {
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from 'react-router-dom'

// Layouts and Components
import MainLayout from './Layouts/MainLayout'
import DLayout from './Layouts/DLayout'

import SidebarLayout from './Layouts/SidebarLayout' // Layout with Sidebar
import PrivateRoute from './Components/PrivateRoute'

// Customer Pages
import HomePage from './Pages/HomePage'
import NotFound from './Pages/NotFound'
import Login from './Pages/Customer/LoginForm'
import Register from './Pages/Customer/RegisterForm'
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

// Shop Pages
import ShopList from './Pages/Shop/ShopList'
import ShopPage from './Pages/Shop/ShopPage'
import ProductPage from './Pages/Shop/ProductPage'
import Cart from './Pages/order/Cart'
import CheckOut from './Pages/order/checkOut'

//Admin
import DashboardLayout from './Components/Admin/DashboardLayout'
import CustomerPage from './Components/Admin/CustomerPage'
import StaffPage from './Components/Admin/StaffPage'
import PromotionPage from './Components/Admin/PromotionPage'
import FinancialAnalysisPage from './Components/Admin/FinancialAnalysisPage'
import CreateStaff from './Components/Admin/AdminCreateStaffPage'
import CreateCustomer from './Components/Admin/AdminCreateCustomerPage'

// Farmer Pages
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

// DElivery supervisor and driver
import DLDriverRegistrationForm from './Pages/delivery/DLDriverRegistrationForm'
import DLApproveDriver from './Pages/delivery/DLApproveDriver' // Ensure the path is correct
import DLDriverAccept from './Pages/delivery/DLDriverAccept'
import DLImageUpload from './Pages/delivery/DLImageUpload'
import DLSendEmail from './Pages/delivery/DLSendEmail' // Import the DLSendEmail component
import DLLogin from './Pages/delivery/DLLogin' // Added DLLogin import

import DeliveryDashboard from './Pages/delivery/DLDriverDashboard'
import DLDriverProfile from './Pages/delivery/DLDriverProfile' // Import the driver profile component
import DLEditProfile from './Pages/delivery/Dleditprofile'
import DLALLdrivers from './Pages/delivery/DLALLdrivers' // Import the DLALLdrivers component
import DLmanageDash from './Pages/delivery/DLmangeDash' // Adjust the path if necessary
import DLViewDriver from './Pages/delivery/DLViewDriver' // Adjust the path according to your project structure
import DLlogout from './Pages/delivery/DLlogout' // Import the DLlogout component
import DLeditdriver from './Pages/delivery/DLeditdriver' // Import the new DLeditdriver page
import OrderForm from './Pages/delivery/DLoooo' // Assuming OrderForm component is in 'components' folder
import OrderTable from './Pages/delivery/DLOtable' // Assuming you store it in the components folder
import Od from './Pages/delivery/or/orderdelete' //
import DLAllDeliveries from './Pages/delivery/DLviewDeliveries' // Import the DLAllDeliveries component
import DLViewDelivery from './Pages/delivery/DLviewDelivery' // Import the
import OngoingDelivery from './Pages/delivery/driver/OngoingDelivery' // Import the OngoingDelivery component
import ViewDelivery from './Pages/delivery/driver/ViewDelivery' // Import the ViewDelivery page
import ViewDeliveries from './Pages/delivery/driver/ViewDeliveries' // Import the ViewDeliveries page

// Define all routes in a single Router
const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            {/* Customer Routes */}
            <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />

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
                        <Route
                            path="/userDashboard"
                            element={<UserDashboard />}
                        />
                        <Route path="/settings" element={<Settings />} />
                        <Route
                            path="/orderhistory"
                            element={<UserAllOrders />}
                        />
                        <Route path="/orderStatus" element={<OrderStatus />} />
                        <Route
                            path="/membership"
                            element={<MembershipUpgrade />}
                        />
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

                {/* Catch-all for 404 */}
                <Route path="*" element={<NotFound />} />
            </Route>

            {/* Farmer Routes */}
            <Route path="/">
                <Route path="/farmerLogin" element={<FarmerLogin />} />
                <Route path="/farmerRegister" element={<FarmerRegister />} />
                <Route path="/farmerdashboard" element={<FarmerDashboard />} />
                <Route path="/farmerprofile" element={<ProfilePage />} />
                <Route path="/myshops" element={<MyShop />} />
                <Route path="/shopcreate" element={<AddShop />} />
                <Route path="/farmerShop/:id" element={<Shop />} />
                <Route path="/farmerShop/profile" element={<ShopProfile />} />
                <Route
                    path="/farmerShop/:id/productpage"
                    element={<Products />}
                />
                <Route path="/addproduct" element={<AddProduct />} />
                <Route path="/updateproduct" element={<UpdateProduct />} />
                <Route path="/farmerlogout" element={<FarmerLogout />} />

                {/* Catch-all for 404 */}
                <Route path="*" element={<NotFound />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/">
                <Route path="/Admindashboard" element={<DashboardLayout />} />
                <Route
                    path="/Admindashboard/customer"
                    element={<CustomerPage />}
                />
                <Route path="/Admindashboard/staff" element={<StaffPage />} />
                <Route
                    path="/Admindashboard/offers"
                    element={<PromotionPage />}
                />
                <Route
                    path="/Admindashboard/financial-analysis"
                    element={<FinancialAnalysisPage />}
                />
                <Route
                    path="/Admindashboard/staff/create"
                    element={<CreateStaff />}
                />{' '}
                {/* Updated path */}
                <Route
                    path="/Admindashboard/Customer/create"
                    element={<CreateCustomer />}
                />
                <Route path="*" element={<NotFound />} />
            </Route>

            {/* delivery and driver Routes */}
            <Route path="/" element={<DLayout />}>
                <Route
                    path="/register-driver"
                    element={<DLDriverRegistrationForm />}
                />
                <Route path="/upload-image" element={<DLImageUpload />} />
                <Route
                    path="/manager/approve-driver"
                    element={<DLApproveDriver />}
                />
                <Route
                    path="/manager/approve-driver/:id"
                    element={<DLDriverAccept />}
                />
                {/*<Route path="/manager/approve-driver/:id/send-email" element={<DLSendEmail />} />*/}
                <Route path="/driver/login" element={<DLLogin />} />{' '}
                {/* Driver Login Route */}
                <Route
                    path="/driver/dashboard"
                    element={<DeliveryDashboard />}
                />
                <Route path="/driver/profile" element={<DLDriverProfile />} />{' '}
                {/* Add profile route */}
                <Route
                    path="/driver/profile/edit"
                    element={<DLEditProfile />}
                />
                <Route path="/alldrivers" element={<DLALLdrivers />} />
                <Route path="/manager/dashboard" element={<DLmanageDash />} />
                <Route
                    path="/manager/view-driver/:id"
                    element={<DLViewDriver />}
                />
                <Route path="/driver/logout" element={<DLlogout />} />
                <Route path="/driver/edit/:id" element={<DLeditdriver />} />
                <Route path="/a" element={<OrderForm />} />
                <Route path="/b" element={<OrderTable />} />
                <Route path="/d" element={<Od />} />
                <Route path="/DLAllDeliveries" element={<DLAllDeliveries />} />
                <Route
                    path="/manager/delivery/:id"
                    element={<DLViewDelivery />}
                />
                <Route path="/ongoing" element={<OngoingDelivery />} />
                <Route
                    path="/driver/delivery/:id"
                    element={<ViewDelivery />}
                />{' '}
                {/* Route for viewing a specific delivery */}
                <Route path="/driver/deliveries" element={<ViewDeliveries />} />
                <Route path="*" element={<NotFound />} />
            </Route>

            {/* Add Other Roots Below */}
        </>
    )
)

const App = () => {
    return <RouterProvider router={router}></RouterProvider>
}

export default App
