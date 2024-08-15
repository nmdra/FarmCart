import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import Header from './Components/Header';
//import Footer from './Components/Footer';
import Login from './pages/farmer/Login';
import Dashboard from './pages/farmer/Dashbaord';
const App = () => {
    return (
     <Router>
       <div className="flex flex-col min-h-screen">
         <main className="flex-grow py-3">
           <div className="container mx-auto">
             <Routes>
               <Route path="/" element={<Login />} />
               <Route path="/dashboard" element={<Dashboard />} />
             </Routes>
           </div>
         </main>
       </div>
     </Router>
   );
 };
 
 export default App;
