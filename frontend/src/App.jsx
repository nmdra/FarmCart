import {
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from 'react-router-dom'
import MainLayout from './Layouts/MainLayout'
import HomePage from './Pages/HomePage'
import NotFound from './Pages/NotFound'
import Login from './Pages/Customer/LoginForm'
import Register from './Pages/Customer/RegisterForm'
import UserProfile from './Pages/Customer/UserProfile'
import PrivateRoute from './Components/PrivateRoute'
import VerifyEmail from './Pages/Customer/VerifyEmail'
import CheckEmail from './Pages/Customer/CheckEmail'
import ForgotPassword from './Pages/Customer/ForgotPassword'
import ResetPassword from './Pages/Customer/PasswordReset'
import UserDashboard from './Pages/Customer/UserDashboard'
import Settings from './Pages/Customer/Settings'
import OrderHistory from './Components/OrderTable'
import UserAllOrders from './Pages/Customer/UserAllOrders'
import FileUploadTest from './Pages/Temp_FileUploadTest'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-pass" element={<ResetPassword />} />
            <Route path="/orderhistory" element={<OrderHistory />} />
            {/* <Route path="/order/:orderId" element={<OrderDetails />} /> */}
            <Route path="/register" element={<Register />} />
            <Route path="/checkEmail" element={<CheckEmail />} />
            <Route path="/verifyEmail" element={<VerifyEmail />} />
            <Route path="/profile" element={<PrivateRoute />}>
                <Route path="" element={<UserProfile />} />
            </Route>
            <Route path="/userDashboard" element={<UserDashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/userAllOrders" element={<UserAllOrders />} />
            <Route path="/fileUploadTest" element={<FileUploadTest />} />

            <Route path="*" element={<NotFound />} />
        </Route>
    )
)

const App = () => {
    return <RouterProvider router={router}></RouterProvider>
}

export default App
