import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiArrowLeft, FiDollarSign, FiPackage, FiUser, FiCalendar, FiPlus } from "react-icons/fi";

const SalesManagement = () => {
  const [sales, setSales] = useState([]);
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [user, setUser] = useState("");
  const [carId, setCarId] = useState("");

  const handleAddSale = (e) => {
    e.preventDefault();
    const newSale = {
      id: Date.now(),
      product,
      quantity: parseInt(quantity),
      price: parseFloat(price),
      user,
      carId,
      date: new Date().toLocaleString(),
    };
    setSales([...sales, newSale]);
    setProduct("");
    setQuantity("");
    setPrice("");
    setUser("");
    setCarId("");
  };

  const totalSales = sales.reduce((sum, sale) => sum + (sale.price * sale.quantity), 0);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FiDollarSign className="text-blue-500" />
          Gestion des ventes
        </h2>
        <NavLink 
          to="/" 
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
        >
          <FiArrowLeft /> Retour au tableau de bord
        </NavLink>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Nouvelle vente</h3>
            <form onSubmit={handleAddSale} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Produit</label>
                <div className="relative">
                  <FiPackage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Nom du produit"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantité</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prix (€)</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vendeur</label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Nom du vendeur"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ID Voiture</label>
                <input
                  type="text"
                  placeholder="ID de la voiture"
                  value={carId}
                  onChange={(e) => setCarId(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2"
              >
                <FiPlus /> Enregistrer la vente
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">Historique des ventes</h3>
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                Total: {totalSales.toFixed(2)} €
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produit</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantité</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendeur</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sales.map((sale) => (
                    <tr key={sale.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sale.product}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.price.toFixed(2)} €</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{(sale.price * sale.quantity).toFixed(2)} €</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.user}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center gap-1">
                        <FiCalendar className="text-gray-400" /> {sale.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesManagement;