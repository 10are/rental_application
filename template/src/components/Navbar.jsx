import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-white text-lg font-bold mr-4">Ana Sayfa</Link>
        </div>
        <div className="flex items-center">
          <Link to="/login" className="text-white mr-4 hover:bg-gray-700 rounded-md py-2 px-4 transition duration-300">Giriş Yap</Link>
          <Link to="/register" className="text-white mr-4 hover:bg-gray-700 rounded-md py-2 px-4 transition duration-300">Kayıt Ol</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
