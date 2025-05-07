import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { 
  FiHome, 
  FiPackage, 
  FiUsers, 
  FiDollarSign,
  FiLogOut,
  FiMenu,
  FiX,
  FiTruck,
  FiUserPlus,
  FiFileText,
  FiSettings
} from "react-icons/fi";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Navigation items configuration
  const navItems = [
    { to: "/", icon: <FiHome size={18} />, label: "Dashboard", show: true },
    { to: "/stock", icon: <FiPackage size={18} />, label: "Stock", show: true },
    { to: "/admin/create-user", icon: <FiUserPlus size={18} />, label: "Utilisateurs", show: user?.role === "admin" },
    { to: "/admin/sales", icon: <FiDollarSign size={18} />, label: "Ventes", show: user?.role === "admin" },
    { to: "/admin/create-vehicle", icon: <FiTruck size={18} />, label: "Véhicules", show: user?.role === "admin" },
    { to: "/admin/create-fournisseur", icon: <FiUsers size={18} />, label: "Fournisseurs", show: user?.role === "admin" },
    { to: "/admin/invoice", icon: <FiFileText size={18} />, label: "Factures", show: user?.role === "admin" },
    { to: "/admin/settings", icon: <FiSettings size={18} />, label: "Paramètres", show: user?.role === "admin" }
  ];

  // Close sidebar when route changes (mobile)
  React.useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Mobile menu button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-800 text-white shadow-lg"
        aria-label="Toggle menu"
      >
        {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 fixed md:sticky top-0 z-40 w-64 h-screen bg-gray-800 text-white flex flex-col transition-transform duration-300 ease-in-out`}
      >
        {/* Brand/Logo */}
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <FiPackage className="text-blue-400" />
            <span>Ste dsg Gros</span>
          </h1>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-2">
          {navItems.map((item) => (
            item.show && (
              <NavLink 
                key={item.to}
                to={item.to}
                className={({ isActive }) => 
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors mb-1 ${
                    isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 text-gray-300'
                  }`
                }
              >
                <span>{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </NavLink>
            )
          ))}
        </nav>
        
        {/* User/Logout */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div>
              <p className="text-sm font-medium">{user?.name || "Utilisateur"}</p>
              <p className="text-xs text-gray-400">{user?.role || "Rôle"}</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-gray-300 hover:text-white"
          >
            <FiLogOut size={16} />
            <span className="text-sm font-medium">Déconnexion</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;