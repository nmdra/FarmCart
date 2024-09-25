import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 bottom-0 w-64 bg-white shadow-md pl-8 pt-16 border-r border-gray-200">
        <h1 className="text-3xl font-bold text-black mb-8">Farmcart</h1>
        <nav className="space-y-6">
          <ul className="space-y-4">
            <li>
              <Link
                to="/customer"
                className="text-lg text-black hover:text-gray-500 transition duration-200"
              >
                Customer
              </Link>
            </li>
            <li>
              <Link
                to="/Admindashboard/staff"
                className="text-lg text-black hover:text-gray-500 transition duration-200"
              >
                Staff
              </Link>
            </li>
            <li>
              <Link
                to="/Admindashboard/offers"
                className="text-lg text-black hover:text-gray-500 transition duration-200"
              >
                Offers
              </Link>
            </li>
            <li>
              <Link
                to="/Admindashboard/financial-analysis"
                className="text-lg text-black hover:text-gray-500 transition duration-200"
              >
                Financial Analysis
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-10 bg-white text-black overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
