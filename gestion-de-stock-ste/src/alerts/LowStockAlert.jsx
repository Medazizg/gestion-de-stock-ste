
import { useNavigate } from "react-router-dom";

const LowStockAlert = ({ items }) => {
  const navigate = useNavigate();
  
  return (
    // ...
    <button 
      onClick={() => navigate("/purchase-orders", { state: { items } })}
      className="mt-2 bg-red-600 text-white px-3 py-1 rounded text-sm"
    >
      Créer une commande
    </button>
  );
};