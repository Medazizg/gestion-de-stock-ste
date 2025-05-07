import React, { useState } from "react";
import { FiPackage, FiAlertTriangle, FiPlus } from "react-icons/fi";

const StockManagement = () => {
  const [stock, setStock] = useState([]);
  const [carId, setCarId] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [type, setType] = useState("entrée");

  const handleAddStock = (e) => {
    e.preventDefault();
    const newItem = {
      carId,
      product,
      quantity: parseInt(quantity),
      type,
      date: new Date().toLocaleString(),
    };
    setStock([...stock, newItem]);
    setCarId("");
    setProduct("");
    setQuantity("");
  };

  const getStockLevel = (product) => {
    return stock
      .filter((item) => item.product === product)
      .reduce((acc, item) => {
        return item.type === "entrée" ? acc + item.quantity : acc - item.quantity;
      }, 0);
  };

  const products = [...new Set(stock.map((item) => item.product))];
  const lowStockProducts = products.filter(product => getStockLevel(product) < 5);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <FiPackage className="text-green-500" />
        Gestion de stock
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Mouvement de stock</h3>
            <form onSubmit={handleAddStock} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ID Voiture</label>
                <input
                  type="text"
                  placeholder="ID de la voiture"
                  value={carId}
                  onChange={(e) => setCarId(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Produit</label>
                <div className="relative">
                  <FiPackage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Nom du produit"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantité</label>
                <input
                  type="number"
                  placeholder="0"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="entrée">Entrée de stock</option>
                  <option value="sortie">Sortie de stock</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2"
              >
                <FiPlus /> Enregistrer
              </button>
            </form>
          </div>

          {lowStockProducts.length > 0 && (
            <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-red-800 flex items-center gap-2 mb-2">
                <FiAlertTriangle /> Stock faible
              </h3>
              <ul className="space-y-2">
                {lowStockProducts.map((product) => (
                  <li key={product} className="text-red-700">
                    {product}: {getStockLevel(product)} unités
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">Niveau de stock</h3>
            </div>

            <div className="divide-y divide-gray-200">
              {products.map((product) => {
                const level = getStockLevel(product);
                const isLowStock = level < 5;
                
                return (
                  <div key={product} className="p-4 hover:bg-gray-50 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isLowStock ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                        <FiPackage />
                      </div>
                      <div>
                        <h4 className="font-medium">{product}</h4>
                        <p className="text-sm text-gray-500">Dernière mise à jour: {
                          stock.filter(i => i.product === product)
                            .sort((a, b) => new Date(b.date) - new Date(a.date))[0]?.date
                        }</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <span className={`font-bold ${isLowStock ? 'text-red-600' : 'text-gray-800'}`}>
                        {level} unités
                      </span>
                      {isLowStock && (
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                          <FiAlertTriangle /> Stock faible
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockManagement;