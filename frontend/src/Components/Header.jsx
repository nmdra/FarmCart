import React from 'react';

const Header = () => {
    return (
        <header className="bg-gray-900 text-white py-4">
            <div className="container mx-auto flex items-center justify-between">
                <h1 className="text-2xl font-bold">FarmCart</h1>
            </div>
            <hr className="border-gray-700" />
        </header>
    );
};

export default Header;
