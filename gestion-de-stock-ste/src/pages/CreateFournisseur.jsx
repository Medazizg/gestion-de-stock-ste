import React, { useState } from "react";
import { FiUser, FiMapPin, FiBox, FiPlus } from "react-icons/fi";

const CreateFournisseur = () => {
  const [fournisseur, setFournisseur] = useState({
    id: "",
    name: "",
    address: "",
    product: "",
  });

  const handleChange = (e) => {
    setFournisseur({ ...fournisseur, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Fournisseur créé:", fournisseur);
    // 🔄 Envoyer à Supabase ici si besoin
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <FiUser className="text-blue-500" />
        Créer un Fournisseur
      </h2>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ID Fournisseur</label>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                name="id"
                placeholder="ID Fournisseur"
                value={fournisseur.id}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom du Fournisseur</label>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                name="name"
                placeholder="Nom du Fournisseur"
                value={fournisseur.name}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
            <div className="relative">
              <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                name="address"
                placeholder="Adresse"
                value={fournisseur.address}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Produit fourni</label>
            <div className="relative">
              <FiBox className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                name="product"
                placeholder="Nom du Produit"
                value={fournisseur.product}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2"
          >
            <FiPlus /> Ajouter Fournisseur
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateFournisseur;