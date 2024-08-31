import React from 'react'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
//import Header from './Components/Header';
//import Footer from './Components/Footer';
import Login from './pages/farmer/FarmerLogin'
import Dashboard from './pages/farmer/FarmerDashbaord'
import ProfilePage from './pages/farmer/FarmerProfile'
import Logout from './pages/farmer/FarmerLogOut'
import Register from './pages/farmer/FarmerRegistaration'
import MyShop from './pages/farmer/Myshops'
import AddShop from './pages/farmer/shopcreate'
import Shop from './pages/farmer/ShopDashboard'
import ShopProfile from './pages/farmer/shopProfile'
import Products from './pages/farmer/products'
import AddProduct from './pages/farmer/addProduct'
import UpdateProduct from './pages/farmer/UpdateProduct'
const App = () => {
    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <main className="flex-grow py-3">
                    <div className="container mx-auto">
                        <Routes>
                            <Route path="/farmerlogin" element={<Login />} />
                            <Route
                                path="/farmerRegister"
                                element={<Register />}
                            />
                            <Route
                                path="/farmerdashboard"
                                element={<Dashboard />}
                            />
                            <Route
                                path="/farmerprofile"
                                element={<ProfilePage />}
                            />
                            <Route path="/myshops" element={<MyShop />} />
                            <Route path="/shopcreate" element={<AddShop />} />
                            <Route path="/shop/:id" element={<Shop />} />
                            <Route
                                path="/shop/profile"
                                element={<ShopProfile />}
                            />
                            <Route
                                path="/shop/:id/productpage"
                                element={<Products />}
                            />
                            <Route
                                path="/addproduct"
                                element={<AddProduct />}
                            />
                            <Route
                                path="/updateproduct"
                                element={<UpdateProduct />}
                            />
                            <Route path="/farmerlogout" element={<Logout />} />
                        </Routes>
                    </div>
                </main>
            </div>
        </Router>
    )
}

export default App
