import './App.css'
import React from 'react';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import Header from './Components/Header';
//import Footer from './Components/Footer';
import Login from './pages/farmer/Login';
import Dashboard from './pages/farmer/Dashbaord';
import ProfilePage from './pages/farmer/onwerProfile';
import Logout from './pages/farmer/LogOut';
import Register from './pages/farmer/Registaration';
import MyShop from './pages/farmer/Myshop';
import AddShop from './pages/farmer/shopcreate';
import Shop from './pages/farmer/Shop';
import ShopProfile from './pages/farmer/shopProfile';

const App = () => {
    return (
     <Router>
       <div className="flex flex-col min-h-screen">
         <main className="flex-grow py-3">
           <div className="container mx-auto">
             <Routes>
               <Route path="/" element={<Login />} />
               <Route path="/register" element={<Register />} />
               <Route path="/dashboard" element={<Dashboard />} />
               <Route path="/ownerprofile" element={<ProfilePage />} />
               <Route path="/myshop" element={<MyShop />} />
               <Route path="/shopcreate" element={<AddShop />} />
               <Route path="/shop/:id" element={<Shop />} />
               <Route path="/shop/profile" element={<ShopProfile />} />
               <Route path="/logout" element={<Logout />} />
             </Routes>
           </div>
         </main>
       </div>
     </Router>
   );
 };
 
 export default App;
