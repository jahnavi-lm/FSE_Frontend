import { useState, useEffect } from "react";

export function StrategyCompareTable({ strategy }) {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  // Filter states
  const [actionFilter, setActionFilter] = useState("ALL");
  const [symbolFilter, setSymbolFilter] = useState("");

  if (!strategy) return null;

  // Original trades
  const allTrades = strategy?.full?.trades || [];

  // Filtered trades
  const trades = allTrades.filter((trade) => {
    let matchesAction =
      actionFilter === "ALL" || trade.action === actionFilter;
    let matchesSymbol =
      symbolFilter === "" ||
      (trade.symbol?.toLowerCase() ?? "").includes(symbolFilter.toLowerCase());
    return matchesAction && matchesSymbol;
  });

  const totalPages =
    rowsPerPage === -1 ? 1 : Math.ceil(trades.length / rowsPerPage);

  const paginatedTrades =
    rowsPerPage === -1
      ? trades
      : trades.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  useEffect(() => {
    setPage(0); // Reset to first page on strategy/filter change
  }, [strategy?.id, rowsPerPage, actionFilter, symbolFilter]);

  return (
    <div className="flex-1 rounded-lg overflow-auto shadow-inner bg-gradient-to-br from-blue-50 to-white border border-blue-100">
      <div className="bg-blue-100 text-blue-800 font-semibold px-4 py-2 border-b border-blue-200 rounded-t-lg">
        {strategy.name}
      </div>

      {trades.length > 0 ? (
        <>
          {/* Filter Controls */}
          <div className="flex flex-wrap items-center gap-4 px-4 py-2 bg-blue-50 border-b border-blue-200">
            <div>
              <label className="text-sm mr-2">Action:</label>
              <select
                className="border border-gray-300 rounded px-2 py-1"
                value={actionFilter}
                onChange={(e) => setActionFilter(e.target.value)}
              >
                <option value="ALL">All</option>
                <option value="BUY">BUY</option>
                <option value="SELL">SELL</option>
              </select>
            </div>
            <div>
              <label className="text-sm mr-2">Symbol:</label>
              <input
                type="text"
                className="border border-gray-300 rounded px-2 py-1"
                placeholder="Filter by symbol..."
                value={symbolFilter}
                onChange={(e) => setSymbolFilter(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-auto">
            <table className="min-w-full text-sm bg-white">
              <thead className="bg-blue-50">
                <tr>
                  <th className="border px-3 py-2 text-left">Date</th>
                  <th className="border px-3 py-2 text-left">Action</th>
                  <th className="border px-3 py-2 text-left">Symbol</th>
                  <th className="border px-3 py-2 text-left">Price</th>
                  <th className="border px-3 py-2 text-left">Quantity</th>
                  <th className="border px-3 py-2 text-left">Total Cost Price</th>
                  <th className="border px-3 py-2 text-left">Opening Balance</th>
                  <th className="border px-3 py-2 text-left">Closing Balance</th>
                  <th className="border px-3 py-2 text-left">NAV</th>
                  <th className="border px-3 py-2 text-left">Realized Profit</th>
                </tr>
              </thead>
              <tbody>
                {paginatedTrades.map((trade, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-blue-50"}>
                    <td className="border px-3 py-2">{trade.date || "-"}</td>
                    <td
                      className={`border px-3 py-2 font-medium ${
                        trade.action === "BUY"
                          ? "text-green-600"
                          : trade.action === "SELL"
                          ? "text-red-600"
                          : "text-gray-800"
                      }`}
                    >
                      {trade.action || "-"}
                    </td>
                    <td className="border px-3 py-2">{trade.symbol || "-"}</td>
                    <td className="border px-3 py-2">{trade.price?.toFixed(2) ?? "-"}</td>
                    <td className="border px-3 py-2">{trade.quantity ?? "-"}</td>
                    <td className="border px-3 py-2">{trade.totalCostPrice?.toFixed(2) ?? "-"}</td>
                    <td className="border px-3 py-2">{trade.openingBalance?.toFixed(2) ?? "-"}</td>
                    <td className="border px-3 py-2">{trade.closingBalance?.toFixed(2) ?? "-"}</td>
                    <td className="border px-3 py-2">{trade.nav?.toFixed(2) ?? "-"}</td>
                    <td
                      className={`border px-3 py-2 font-medium ${
                        trade.realizedProfit > 0
                          ? "text-green-600"
                          : trade.realizedProfit < 0
                          ? "text-red-600"
                          : "text-gray-800"
                      }`}
                    >
                      {trade.realizedProfit != null ? trade.realizedProfit.toFixed(2) : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex flex-wrap items-center justify-between px-4 py-2 bg-blue-50 border-t border-blue-200 text-sm">
            <div>
              Rows per page:
              <select
                className="ml-2 border border-gray-300 rounded px-2 py-1"
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(Number(e.target.value))}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={-1}>All</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="px-2 py-1 border rounded bg-white disabled:opacity-50"
                disabled={page === 0}
                onClick={() => setPage((p) => Math.max(p - 1, 0))}
              >
                Prev
              </button>
              <span>
                Page {page + 1} of {totalPages}
              </span>
              <button
                className="px-2 py-1 border rounded bg-white disabled:opacity-50"
                disabled={page + 1 >= totalPages}
                onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
              >
                Next
              </button>
            </div>
          </div>
        </>
      ) : (
        <p className="px-4 py-3 text-gray-500">No trades available.</p>
      )}
    </div>
  );
}
