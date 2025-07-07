import React, { useState, useEffect } from "react";
import {
  getCompaniesByIndex,
  importCandleData,
} from "../../api/candleImportApi";
import toast from "react-hot-toast";

const indices = ["NIFTY 50", "NIFTY NEXT 50", "NIFTY 100"];

const ImportCandleData = () => {
  const [selectedIndex, setSelectedIndex] = useState("");
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      if (!selectedIndex) {
        setCompanies([]);
        return;
      }

      setLoading(true);
      try {
        const data = await getCompaniesByIndex(selectedIndex);
        setCompanies(data);
      } catch (err) {
        console.error("Error fetching companies:", err);
        setCompanies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [selectedIndex]);

  const handleSubmit = async () => {
    if (!selectedIndex) {
      toast.error("Please select an index");
      return;
    }

    const importPromise = importCandleData(selectedIndex);

    toast.promise(
      importPromise,
      {
        loading: `Importing ${selectedIndex}`,
        success: (message) => message,
        error: "Import failed. Please try again.",
      },
      {
        loading: {
          duration: Infinity, // 🔁 keep until resolved
        },
        success: {
          duration: 5000, // ✅ hide after 5s
        },
        error: {
          duration: 5000, // ❌ hide after 5s
        },
      }
    );
  };

  return (
    <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl shadow-inner">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <h2 className="text-xl font-bold mb-4">Import NIFTY Index Data</h2>

        <select
          className="w-full p-3 border rounded-lg mb-4"
          value={selectedIndex}
          onChange={(e) => setSelectedIndex(e.target.value)}
        >
          <option value="">Select an Index</option>
          {indices.map((index) => (
            <option key={index} value={index}>
              {index}
            </option>
          ))}
        </select>

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition mb-6"
        >
          Import Data
        </button>

        {loading && <p className="text-gray-600">Loading companies...</p>}

        {!loading && companies.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: Math.ceil(companies.length / 10) }).map(
              (_, colIndex) => (
                <div key={colIndex} className="bg-white p-4 rounded-lg shadow">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-blue-100 text-left">
                        <th className="px-4 py-2 border">#</th>
                        <th className="px-4 py-2 border">Company</th>
                      </tr>
                    </thead>
                    <tbody>
                      {companies
                        .slice(colIndex * 10, colIndex * 10 + 10)
                        .map((symbol, i) => (
                          <tr key={symbol}>
                            <td className="px-4 py-1 border">
                              {colIndex * 10 + i + 1}
                            </td>
                            <td className="px-4 py-1 border">{symbol}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImportCandleData;
