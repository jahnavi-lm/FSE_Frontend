import React, { useState, useEffect } from "react";
import {
  getCompaniesByIndex,
  importCandleData,
} from "../../api/candleImportApi";
import toast from "react-hot-toast";
import { FiPlus, FiX } from "react-icons/fi";

const indices = ["NIFTY 50", "NIFTY NEXT 50", "NIFTY 100"];

const ImportCandleData = () => {
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllCompanies = async () => {
      if (selectedIndices.length === 0) {
        setCompanies([]);
        return;
      }

      setLoading(true);
      try {
        let allCompanies = [];
        for (const index of selectedIndices) {
          const data = await getCompaniesByIndex(index);
          allCompanies = [...allCompanies, ...data];
        }
        const uniqueCompanies = [...new Set(allCompanies)];
        setCompanies(uniqueCompanies);
      } catch (err) {
        console.error("Error fetching companies:", err);
        setCompanies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCompanies();
  }, [selectedIndices]);

  const handleImport = async () => {
    if (selectedIndices.length === 0) {
      toast.error("Please select at least one index");
      return;
    }

    for (const index of selectedIndices) {
      const importPromise = importCandleData(index);
      toast.promise(
        importPromise,
        {
          loading: `Importing ${index}`,
          success: (message) => message,
          error: "Import failed. Please try again.",
        },
        {
          loading: { duration: Infinity },
          success: { duration: 5000 },
          error: { duration: 5000 },
        }
      );
    }
  };

  const handleAddIndex = (index) => {
    setSelectedIndices((prev) => [...prev, index]);
    setDropdownOpen(false);
  };

  const handleRemoveIndex = (index) => {
    setSelectedIndices((prev) => prev.filter((i) => i !== index));
  };

  return (
    <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl shadow-inner">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <h2 className="text-xl font-bold mb-4">Import NIFTY Index Data</h2>

        {/* Add Index Section */}
        <div className="mb-4">
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 bg-white border px-4 py-2 rounded-lg shadow hover:bg-blue-100 transition"
          >
            <FiPlus />
            Add Index
          </button>

          {dropdownOpen && (
            <div className="mt-2 bg-white border rounded-lg shadow w-64 z-10">
              {indices
                .filter((index) => !selectedIndices.includes(index))
                .map((index) => (
                  <div
                    key={index}
                    onClick={() => handleAddIndex(index)}
                    className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                  >
                    {index}
                  </div>
                ))}
              {indices.filter((i) => !selectedIndices.includes(i)).length === 0 && (
                <div className="px-4 py-2 text-gray-400">All indices selected</div>
              )}
            </div>
          )}
        </div>

        {/* Selected Indices Display */}
        <div className="mb-4 flex flex-wrap gap-2">
          {selectedIndices.map((index) => (
            <span
              key={index}
              className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
            >
              {index}
              <button
                onClick={() => handleRemoveIndex(index)}
                className="ml-2 text-blue-600 hover:text-red-600"
              >
                <FiX />
              </button>
            </span>
          ))}
        </div>

        <button
          onClick={handleImport}
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
