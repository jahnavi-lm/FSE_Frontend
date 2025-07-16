import { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

const INDICES = ["NIFTY 50", "NIFTY NEXT 50"];
const COMPANIES = [
  "HDFCBANK.NS", "ICICIBANK.NS", "RELIANCE.NS", "TCS.NS", "BHARTIARTL.NS", "INFY.NS", "BAJFINANCE.NS", "HINDUNILVR.NS",
  "ITC.NS", "LT.NS", "HCLTECH.NS", "KOTAKBANK.NS", "ULTRACEMCO.NS", "AXISBANK.NS", "TITAN.NS", "NTPC.NS",
  "ASIANPAINT.NS", "NESTLEIND.NS", "SBIN.NS", "SUNPHARMA.NS", "MARUTI.NS", "M&M.NS", "JSWSTEEL.NS", "TATAMOTORS.NS",
  "TATASTEEL.NS", "TECHM.NS", "WIPRO.NS", "ADANIENT.NS", "ADANIPORTS.NS", "COALINDIA.NS", "POWERGRID.NS", "DRREDDY.NS",
  "CIPLA.NS", "EICHERMOT.NS", "HEROMOTOCO.NS", "HINDALCO.NS", "INDUSINDBK.NS", "SHREECEM.NS", "BPCL.NS", "ONGC.NS",
  "GRASIM.NS", "IOC.NS", "HDFCLIFE.NS", "SBILIFE.NS", "BAJAJ-AUTO.NS", "BAJAJFINSV.NS", "BRITANNIA.NS", "HDFC.NS",
  "UPL.NS", "BOSCHLTD.NS", "ABB.NS", "APOLLOHOSP.NS", "AMBUJACEM.NS", "ADANIGREEN.NS", "BIOCON.NS", "BEL.NS",
  "BANKBARODA.NS", "BANDHANBNK.NS", "CANBK.NS", "CHOLAFIN.NS", "COLPAL.NS", "DABUR.NS", "DLF.NS", "GODREJCP.NS",
  "GAIL.NS", "HAVELLS.NS", "ICICIPRULI.NS", "INDIGO.NS", "LTIM.NS", "LTTS.NS", "L&TFH.NS", "LICI.NS", "MCDOWELL-N.NS",
  "MFSL.NS", "MUTHOOTFIN.NS", "NAUKRI.NS", "NHPC.NS", "NMDC.NS", "OFSS.NS", "PAGEIND.NS", "PETRONET.NS", "PIDILITIND.NS",
  "PIIND.NS", "PFC.NS", "RECLTD.NS", "SAIL.NS", "SIEMENS.NS", "SRF.NS", "TORNTPHARM.NS", "TRENT.NS", "TVSMOTOR.NS",
  "UBL.NS", "VOLTAS.NS", "ZYDUSLIFE.NS", "AUROPHARMA.NS", "ALKEM.NS", "INDUSTOWER.NS", "IOCL.NS", "JINDALSTEL.NS"
];

export default function StrategiesForm({ onSave, onCancel, initialValues }) {
  const [form, setForm] = useState({
    strategyName: "",
    strategyScript: "",
    symbolList: [],
    startDate: "",
    endDate: "",
    initialCapital: "",
  });

  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    if (initialValues) {
      let parsedParams = {};
      try {
        parsedParams = initialValues.parametersJson
          ? JSON.parse(initialValues.parametersJson)
          : {};
      } catch (e) {
        console.error("Invalid JSON in parametersJson:", e);
      }

      setForm({
        strategyName: initialValues.strategyName || "",
        strategyScript: initialValues.strategyScript || "",
        symbolList: initialValues.symbolList || [],
        startDate: initialValues.startDate || "",
        endDate: initialValues.endDate || "",
        initialCapital: initialValues.initialCapital || "",
      });
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleSymbol = (symbol) => {
    setForm((prev) => ({
      ...prev,
      symbolList: prev.symbolList.includes(symbol)
        ? prev.symbolList.filter((s) => s !== symbol)
        : [...prev.symbolList, symbol],
    }));
  };

  const removeSymbol = (symbol) => {
    setForm((prev) => ({
      ...prev,
      symbolList: prev.symbolList.filter((s) => s !== symbol),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newStrategy = {
      ...(initialValues?.id ? { id: initialValues.id } : {}),
      strategyName: form.strategyName,
      strategyScript: form.strategyScript,
      symbolList: form.symbolList,
      startDate: form.startDate,
      endDate: form.endDate,
      initialCapital: parseFloat(form.initialCapital || 0),
      status: "not started",
      resultJson: null,
    };
    onSave(newStrategy);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6 bg-blue-50">
      <h2 className="text-2xl font-bold text-teal-700 text-center">
        {initialValues ? "Edit Strategy" : "Create New Strategy"}
      </h2>

      {/* GRID LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LEFT */}
        <div className="flex flex-col gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Strategy Name
            </label>
            <input
              type="text"
              name="strategyName"
              value={form.strategyName}
              onChange={handleChange}
              placeholder="Enter strategy name"
              className="w-full border border-gray-300 rounded-md p-2 bg-white shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Initial Capital
            </label>
            <input
              type="number"
              name="initialCapital"
              value={form.initialCapital}
              onChange={handleChange}
              placeholder="e.g., 500000"
              className="w-full border border-gray-300 rounded-md p-2 bg-white shadow-sm"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-800 mb-1">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 bg-white shadow-sm"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-800 mb-1">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 bg-white shadow-sm"
              />
            </div>
          </div>

          {/* Symbol Dropdown */}
          <div className="relative w-full">
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Select Symbols
            </label>
            <div
              className="border border-gray-300 p-2 rounded-md bg-white cursor-pointer shadow-sm"
              onClick={() => setDropdownVisible(!dropdownVisible)}
            >
              {form.symbolList.length > 0
                ? `${form.symbolList.length} selected`
                : "Click to Select..."}
            </div>

            {dropdownVisible && (
              <div className="absolute left-0 right-0 mt-2 border border-gray-300 rounded-md shadow-md p-3 bg-white z-20 max-h-64 overflow-y-auto space-y-2 scrollbar-hide">
                <div>
                  <p className="font-semibold text-gray-600">Indices</p>
                  {INDICES.map((symbol) => (
                    <label
                      key={symbol}
                      className="flex items-center space-x-2 hover:bg-blue-50 p-1 rounded"
                    >
                      <input
                        type="checkbox"
                        checked={form.symbolList.includes(symbol)}
                        onChange={() => toggleSymbol(symbol)}
                      />
                      <span>{symbol}</span>
                    </label>
                  ))}
                </div>
                <div className="mt-2">
                  <p className="font-semibold text-gray-600">Stocks</p>
                  {COMPANIES.map((symbol) => (
                    <label
                      key={symbol}
                      className="flex items-center space-x-2 hover:bg-blue-50 p-1 rounded"
                    >
                      <input
                        type="checkbox"
                        checked={form.symbolList.includes(symbol)}
                        onChange={() => toggleSymbol(symbol)}
                      />
                      <span>{symbol}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2 mt-2">
              {form.symbolList.map((symbol) => (
                <span
                  key={symbol}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {symbol}
                  <button
                    type="button"
                    className="ml-2 text-red-600 hover:text-red-800"
                    onClick={() => removeSymbol(symbol)}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SCRIPT EDITOR */}
      <div className="flex flex-col gap-4">
        <label className="text-sm font-semibold text-gray-800">
          Strategy Script
        </label>
        <div className="h-64 border border-gray-300 rounded-md overflow-hidden bg-white shadow-sm">
          <CodeMirror
            value={form.strategyScript}
            height="100%"
            theme="light"
            extensions={[javascript()]}
            onChange={(value) =>
              setForm((f) => ({ ...f, strategyScript: value }))
            }
            basicSetup={{ lineNumbers: true }}
          />
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-4 mt-4">
        <button
          type="submit"
          className="bg-green-600 text-white font-medium px-6 py-2 rounded-md hover:bg-green-700 transition"
        >
          {initialValues ? "Update Strategy" : "Save Strategy"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-600 border border-gray-400 px-6 py-2 rounded-md hover:text-gray-800"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}



