import React, { useState, useEffect } from "react";
import {
  FiPackage,
  FiCheck,
  FiShoppingCart,
  FiShoppingBag,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiSave,
  FiAlertTriangle,
  FiSearch,
  FiPhone,
  FiPrinter
} from "react-icons/fi";

const Dashboard = ({ readOnly = false }) => {
  // Sample initial data
  const initialProducts = [
    { id: 1, nom: "Produit A", quantite: 50, status: "En stock", categorie: "Électronique", fournisseur: "Fournisseur X" },
    { id: 2, nom: "Produit B", quantite: 0, status: "Vendu", categorie: "Maison", fournisseur: "Fournisseur Y" },
    { id: 3, nom: "Produit C", quantite: 15, status: "En stock", categorie: "Vêtements", fournisseur: "Fournisseur Z" },
    { id: 4, nom: "Produit D", quantite: 0, status: "Vendu", categorie: "Accessoires", fournisseur: "Fournisseur W" },
  ];

  const [produits, setProduits] = useState(initialProducts);
  const [editingIndex, setEditingIndex] = useState(null);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [newProduct, setNewProduct] = useState({
    nom: "",
    quantite: 0,
    categorie: "",
    fournisseur: ""
  });

  // Get unique categories
  const categories = ["Tous", ...new Set(produits.map(p => p.categorie))];

  // Filter products based on search and category
  const filteredProduits = produits.filter(p => {
    const matchesSearch = p.nom.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         p.fournisseur.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Tous" || p.categorie === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Update low stock products when products change
  useEffect(() => {
    const lowStock = produits.filter(p => p.status === "En stock" && p.quantite < 20);
    setLowStockProducts(lowStock);
  }, [produits]);

  const handleEditChange = (index, field, value) => {
    const newProduits = [...produits];
    newProduits[index][field] = field === "quantite" ? parseInt(value) || 0 : value;
    setProduits(newProduits);
  };

  const deleteProduit = (index) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit?")) {
      const newProduits = produits.filter((_, i) => i !== index);
      setProduits(newProduits);
    }
  };

  const addNewProduct = () => {
    if (!newProduct.nom || !newProduct.categorie) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }
    
    const product = {
      id: Date.now(), // Use timestamp for unique ID
      nom: newProduct.nom,
      quantite: newProduct.quantite,
      status: "En stock",
      categorie: newProduct.categorie,
      fournisseur: newProduct.fournisseur
    };
    
    setProduits([...produits, product]);
    setNewProduct({ nom: "", quantite: 0, categorie: "", fournisseur: "" });
  };

  // Stats cards data
  const stats = [
    {
      title: "Total Articles",
      value: produits.reduce((acc, p) => acc + p.quantite, 0),
      icon: <FiPackage className="text-xl text-blue-500" />,
      bg: "bg-blue-50",
    },
    {
      title: "Disponible",
      value: produits.filter((p) => p.status === "En stock").length,
      icon: <FiCheck className="text-xl text-green-500" />,
      bg: "bg-green-50",
    },
    {
      title: "Vendus",
      value: produits.filter((p) => p.status === "Vendu").length,
      icon: <FiShoppingCart className="text-xl text-purple-500" />,
      bg: "bg-purple-50",
    },
    {
      title: "Catégories",
      value: new Set(produits.map((p) => p.categorie)).size,
      icon: <FiShoppingBag className="text-xl text-orange-500" />,
      bg: "bg-orange-50",
    },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FiPackage className="text-blue-500" />
          Tableau de Bord - Gestion de Stock
        </h1>
      </div>

      {/* Low Stock Alert */}
      {lowStockProducts.length > 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">
          <div className="flex items-center gap-3 text-yellow-800">
            <FiAlertTriangle className="flex-shrink-0" />
            <div>
              <h3 className="font-semibold">Attention: Stock faible</h3>
              <p className="text-sm mt-1">
                {lowStockProducts.length} produit(s) ont un stock inférieur à 20 unités
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {lowStockProducts.map((p, i) => (
                  <span key={i} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs">
                    {p.nom} ({p.quantite} unités)
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className={`${stat.bg} p-4 rounded-xl shadow-sm flex items-center justify-between`}>
            <div>
              <h4 className="text-sm font-medium text-gray-500">{stat.title}</h4>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
            </div>
            <div className="p-2 rounded-full bg-white shadow-sm">{stat.icon}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par produit ou fournisseur..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">
            Liste des Produits <span className="text-gray-500">({filteredProduits.length})</span>
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qté</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catégorie</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fournisseur</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                {!readOnly && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProduits.length > 0 ? (
                filteredProduits.map((p, index) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingIndex === index ? (
                        <input
                          className="border rounded px-3 py-1 w-full focus:ring-2 focus:ring-blue-500"
                          value={p.nom}
                          onChange={(e) => handleEditChange(index, "nom", e.target.value)}
                        />
                      ) : (
                        <span className={`${p.status === "En stock" && p.quantite < 20 ? 'text-yellow-600 font-medium' : 'text-gray-900'}`}>
                          {p.nom}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingIndex === index ? (
                        <input
                          type="number"
                          className="border rounded px-3 py-1 w-20 focus:ring-2 focus:ring-blue-500"
                          value={p.quantite}
                          onChange={(e) => handleEditChange(index, "quantite", e.target.value)}
                        />
                      ) : (
                        <span className={`${p.status === "En stock" && p.quantite < 20 ? 'text-yellow-600 font-medium' : 'text-gray-500'}`}>
                          {p.quantite}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingIndex === index ? (
                        <select
                          className="border rounded px-3 py-1 focus:ring-2 focus:ring-blue-500"
                          value={p.categorie}
                          onChange={(e) => handleEditChange(index, "categorie", e.target.value)}
                        >
                          {categories.filter(cat => cat !== "Tous").map((cat, i) => (
                            <option key={i} value={cat}>{cat}</option>
                          ))}
                        </select>
                      ) : (
                        <span className="text-gray-500">{p.categorie}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingIndex === index ? (
                        <input
                          className="border rounded px-3 py-1 w-full focus:ring-2 focus:ring-blue-500"
                          value={p.fournisseur}
                          onChange={(e) => handleEditChange(index, "fournisseur", e.target.value)}
                        />
                      ) : (
                        <div className="flex items-center gap-2">
                          <FiPhone className="text-gray-400" size={14} />
                          <span className="text-gray-500">{p.fournisseur}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingIndex === index ? (
                        <select
                          className="border rounded px-3 py-1 focus:ring-2 focus:ring-blue-500"
                          value={p.status}
                          onChange={(e) => handleEditChange(index, "status", e.target.value)}
                        >
                          <option value="En stock">En stock</option>
                          <option value="Vendu">Vendu</option>
                        </select>
                      ) : (
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          p.status === "En stock"
                            ? p.quantite < 20
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}>
                          {p.status}
                        </span>
                      )}
                    </td>
                    {!readOnly && (
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex gap-2">
                          {editingIndex === index ? (
                            <button
                              onClick={() => setEditingIndex(null)}
                              className="text-green-600 hover:text-green-900"
                              title="Enregistrer"
                            >
                              <FiSave size={18} />
                            </button>
                          ) : (
                            <button
                              onClick={() => setEditingIndex(index)}
                              className="text-blue-600 hover:text-blue-900"
                              title="Modifier"
                            >
                              <FiEdit size={18} />
                            </button>
                          )}
                          <button
                            onClick={() => deleteProduit(index)}
                            className="text-red-600 hover:text-red-900"
                            title="Supprimer"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={readOnly ? 5 : 6} className="px-6 py-4 text-center text-gray-500">
                    Aucun produit trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Form */}
      {!readOnly && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FiPlus className="text-blue-500" />
            Ajouter un Nouveau Produit
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom du Produit*</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={newProduct.nom}
                onChange={(e) => setNewProduct({...newProduct, nom: e.target.value})}
                placeholder="Ex: Clavier sans fil"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantité*</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={newProduct.quantite}
                onChange={(e) => setNewProduct({...newProduct, quantite: parseInt(e.target.value) || 0})}
                min="0"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie*</label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={newProduct.categorie}
                onChange={(e) => setNewProduct({...newProduct, categorie: e.target.value})}
                required
              >
                <option value="">Sélectionner</option>
                {categories.filter(cat => cat !== "Tous").map((cat, i) => (
                  <option key={i} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fournisseur</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={newProduct.fournisseur}
                onChange={(e) => setNewProduct({...newProduct, fournisseur: e.target.value})}
                placeholder="Ex: Fournisseur XYZ"
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={addNewProduct}
              disabled={!newProduct.nom || !newProduct.categorie}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md flex items-center gap-2 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              <FiPlus /> Ajouter Produit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;