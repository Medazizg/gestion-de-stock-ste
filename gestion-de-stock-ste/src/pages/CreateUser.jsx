import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { FiUser, FiKey, FiCheckCircle } from "react-icons/fi";

const CreateUser = () => {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [success, setSuccess] = useState(false);
  const { user } = useAuth();

  if (!user || user.role !== "admin") {
    return <Navigate to="/unauthorized" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Created:", { username, userId });
    setSuccess(true);
    setUsername("");
    setUserId("");
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <FiUser className="text-blue-500" />
        <span>Créer un nouvel utilisateur</span>
      </h2>
      
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="username">
            Nom d'utilisateur
          </label>
          <div className="relative">
            <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              id="username"
              type="text"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="userId">
            ID de l'utilisateur
          </label>
          <div className="relative">
            <FiKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              id="userId"
              type="text"
              placeholder="ID de l'utilisateur"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2"
        >
          Créer l'utilisateur
        </button>
        
        {success && (
          <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg flex items-center gap-2">
            <FiCheckCircle className="text-green-500" />
            <span>Utilisateur créé avec succès!</span>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateUser;