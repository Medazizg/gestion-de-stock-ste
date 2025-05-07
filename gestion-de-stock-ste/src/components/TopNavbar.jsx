import React from "react";
import { FiSearch, FiBell, FiUser, FiAlertTriangle } from "react-icons/fi";

const TopNavbar = ({ lowStockProducts = [] }) => {
  return (
    <div className="bg-white shadow-sm p-3 md:p-4 flex justify-between items-center">
      {/* Search - hidden on small screens */}
      <div className="hidden md:block relative w-1/3">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <div className="flex items-center gap-4 md:gap-6">
        {/* Notification with low stock alert */}
        <div className="relative group">
          <button className="p-2 rounded-full hover:bg-gray-100 relative">
            <FiBell className="text-xl text-gray-600" />
            {lowStockProducts.length > 0 && (
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </button>
          
          {lowStockProducts.length > 0 && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-10 hidden group-hover:block border border-gray-200">
              <div className="p-3 bg-yellow-50 border-b border-yellow-200">
                <p className="font-semibold text-yellow-800 flex items-center gap-2">
                  <FiAlertTriangle className="text-yellow-600" />
                  Stock faible ({lowStockProducts.length})
                </p>
              </div>
              <div className="max-h-60 overflow-y-auto">
                {lowStockProducts.map((product, index) => (
                  <div key={index} className="p-3 border-b border-gray-100 last:border-0 hover:bg-gray-50">
                    <p className="text-sm font-medium">{product.nom}</p>
                    <p className="text-xs text-gray-500">Seulement {product.quantite} unités restantes</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default TopNavbar;