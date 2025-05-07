import React, { useState } from "react";

const CreateVehicle = () => {
  const [vehicle, setVehicle] = useState({
    name: "",
    type: "",
    licensePlate: "",
    capacity: "",
    status: "available",
  });

  const handleChange = (e) => {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Vehicle created:", vehicle);
    // 🔄 Replace with Supabase or backend request
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Créer un véhicule
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Nom</label>
            <input
              name="name"
              value={vehicle.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              placeholder="Nom du véhicule"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Type</label>
            <input
              name="type"
              value={vehicle.type}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              placeholder="Camion, Van, etc."
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Plaque d'immatriculation</label>
            <input
              name="licensePlate"
              value={vehicle.licensePlate}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              placeholder="123-TN-456"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Capacité (kg)</label>
            <input
              name="capacity"
              type="number"
              value={vehicle.capacity}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              placeholder="2000"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Statut</label>
            <select
              name="status"
              value={vehicle.status}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            >
              <option value="available">Disponible</option>
              <option value="in-transit">En cours</option>
              <option value="maintenance">En maintenance</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white w-full py-2 rounded-md hover:bg-blue-700 transition"
          >
            Ajouter véhicule
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateVehicle;
