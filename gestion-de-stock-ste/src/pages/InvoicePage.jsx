import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; 

const InvoicePage = ({ salesData = [], userInfo = {} }) => {
  const [dailySales, setDailySales] = useState([]);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const filtered = salesData.filter(
      (sale) => sale?.date?.startsWith(today)
    );
    setDailySales(filtered);
  }, [salesData]);

  const calculateTotals = () => {
    let totalHT = 0;
    let tva7 = 0;
    let tva19 = 0;

    dailySales.forEach((sale) => {
      const subtotal = sale.quantity * sale.price;
      totalHT += subtotal;
      if (sale.tva === 7) tva7 += subtotal * 0.07;
      else if (sale.tva === 19) tva19 += subtotal * 0.19;
    });

    return {
      totalHT: totalHT.toFixed(3),
      tva7: tva7.toFixed(3),
      tva19: tva19.toFixed(3),
      totalTTC: (totalHT + tva7 + tva19).toFixed(3),
    };
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.text("Facture", 14, 10);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 20);
    doc.text(`Client: ${userInfo.car || "N/A"}`, 14, 30);

    const rows = dailySales.map((sale) => [
      sale.product || "N/A",
      sale.quantity || 0,
      sale.price?.toFixed(3) || "0.000",
      `${sale.tva || 0}%`,
      (sale.quantity * sale.price).toFixed(3),
    ]);

    autoTable(doc, {
      head: [["Produit", "Quantité", "Prix U", "TVA", "Total HT"]],
      body: rows,
      startY: 40,
    });

    const finalY = doc.lastAutoTable.finalY;

    const totals = calculateTotals();
    doc.text(`Total HT: ${totals.totalHT} DT`, 14, finalY + 10);
    doc.text(`TVA 7%: ${totals.tva7} DT`, 14, finalY + 20);
    doc.text(`TVA 19%: ${totals.tva19} DT`, 14, finalY + 30);
    doc.text(`NET À PAYER: ${totals.totalTTC} DT`, 14, finalY + 40);

    doc.save("facture.pdf");
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Créer une facture quotidienne</h2>
      <button
        onClick={generatePDF}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Générer PDF
      </button>
    </div>
  );
};

export default InvoicePage;