import React, { useEffect, useState } from "react";
import { getAllSchemes } from "../../api/investorApi"; // You must create this API
import { Link } from 'react-router-dom';


function InvDashAllSchemes() {
  const [schemes, setSchemes] = useState([]);
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    async function fetchSchemes() {
      try {
        const data = await getAllSchemes();
        setSchemes(data);
      } catch (error) {
        console.error("Failed to fetch schemes", error);
        setSchemes([]);
      }
    }

    fetchSchemes();
  }, []);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const sortedData = [...schemes].sort((a, b) => {
    if (!sortKey) return 0;

    const valA = a[sortKey];
    const valB = b[sortKey];

    if (typeof valA === "string") {
      return sortOrder === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    }

    return sortOrder === "asc" ? valA - valB : valB - valA;
  });

  const paginatedData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  return (
    <div className="flex flex-col space-y-6">
      <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl shadow-inner">
        <h3 className="text-xl font-semibold text-blue-700 mb-4">
          All Mutual Fund Schemes
        </h3>
        <p className="text-gray-700 mb-6">
          Sort and explore funds to understand NAVs, risk level, and available investment.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full table-fixed text-sm text-left border border-blue-100 rounded-lg shadow-sm">
            <thead className="bg-blue-100 text-blue-800">
              <tr>
                <th
                  className="p-3 font-semibold cursor-pointer select-none w-[256px]"
                  onClick={() => handleSort("fundName")}
                >
                  <span className="inline-flex items-center gap-1">
                    Fund Name
                    <span className="inline-block text-xs">
                      {sortKey === "fundName"
                        ? sortOrder === "asc"
                          ? "▲"
                          : "▼"
                        : "⇅"}
                    </span>
                  </span>
                </th>
                <th
                  className="p-3 font-semibold cursor-pointer select-none w-[100px]"
                  onClick={() => handleSort("nav")}
                >
                  <span className="inline-flex items-center gap-1">
                    Cur-NAV ₹
                    <span className="inline-block text-xs">
                      {sortKey === "nav"
                        ? sortOrder === "asc"
                          ? "▲"
                          : "▼"
                        : "⇅"}
                    </span>
                  </span>
                </th>
                <th className="p-3 font-semibold w-[120px]">Category</th>
                <th className="p-3 font-semibold w-[120px]">Risk</th>
                <th
                  className="p-3 font-semibold cursor-pointer select-none w-[100px]"
                  onClick={() => handleSort("amount")}
                >
                  <span className="inline-flex items-center gap-1">
                    Amount ₹
                    <span className="inline-block text-xs">
                      {sortKey === "amount"
                        ? sortOrder === "asc"
                          ? "▲"
                          : "▼"
                        : "⇅"}
                    </span>
                  </span>
                </th>
                <th className="p-3 font-semibold w-[100px]">Action</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-blue-100">
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-500">
                    No schemes available right now to display. <br />
                    Waiting for Fund Manager / AMC to add.
                  </td>
                </tr>
              ) : (
                paginatedData.map((scheme, idx) => (
                  <tr key={idx}>
                    <td className="p-3 font-medium text-gray-800 w-[256px] truncate" title={scheme.fundName}>
                      {scheme.fundName}
                    </td>
                    <td className="p-3 text-gray-700 w-[100px]">₹{scheme.nav}</td>
                    <td className="p-3 text-gray-700 w-[120px]">{scheme.category}</td>
                    <td className="p-3 text-gray-700 w-[120px]">{scheme.riskLevel}</td>
                    <td className="p-3 text-gray-700 w-[100px]">₹{scheme.amount.toLocaleString()}</td>
                    <td className="p-3 w-[100px]">
                      <Link
                        to={`/view/fund/${scheme.id}`}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md text-sm transition duration-200"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              )}

            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between mt-4 text-sm text-gray-600">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${
              currentPage === 1
                ? "bg-gray-200"
                : "bg-indigo-500 text-white hover:bg-indigo-600"
            }`}
          >
            Prev
          </button>

          <span className="mt-1">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages
                ? "bg-gray-200"
                : "bg-indigo-500 text-white hover:bg-indigo-600"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default InvDashAllSchemes;
