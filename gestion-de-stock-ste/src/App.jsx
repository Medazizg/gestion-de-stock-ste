import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import CreateUser from "./pages/CreateUser";
import StockManagement from "./pages/StockManagement";
import SalesManagement from "./pages/SalesManagement";
import InvoicePage from "./pages/InvoicePage";
import CreateVehicle from "./pages/CreateVehicle"; 
import CreateFournisseur from "./pages/CreateFournisseur";

import { AuthProvider, useAuth } from "./context/AuthContext";
import "./index.css";
import "tailwindcss";

const PrivateRoute = ({ children, role }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/unauthorized" />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="stock" element={<StockManagement />} />
          </Route>
          <Route
            path="/admin"
            element={
              <PrivateRoute role="admin">
                <Layout />
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="create-user" element={<CreateUser />} />
            <Route path="sales" element={<SalesManagement />} />
            <Route path="invoice" element={<InvoicePage />} />
            <Route path="create-vehicle" element={<CreateVehicle />} />
            <Route path="create-fournisseur" element={<CreateFournisseur />} />

          </Route>
          <Route
            path="/unauthorized"
            element={
              <div className="p-8 text-red-500 text-lg">
                Unauthorized Access
              </div>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;