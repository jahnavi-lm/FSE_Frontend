import { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

const INDICES = ["NIFTY 50", "NIFTY NEXT 50"];
const COMPANIES = [
  "HDFCBANK.NS", "ICICIBANK.NS", "RELIANCE.NS", "TCS.NS", "BHARTIARTL.NS", "INFY.NS", "BAJFINANCE.NS", "HINDUNILVR.NS", "ITC.NS",
  "LT.NS", "HCLTECH.NS", "KOTAKBANK.NS", "ULTRACEMCO.NS", "AXISBANK.NS", "TITAN.NS", "NTPC.NS", "ASIANPAINT.NS", "NESTLEIND.NS", "SBIN.NS",
  "SUNPHARMA.NS", "MARUTI.NS", "M&M.NS", "JSWSTEEL.NS", "TATAMOTORS.NS", "TATASTEEL.NS", "TECHM.NS", "WIPRO.NS", "ADANIENT.NS",
  "ADANIPORTS.NS", "COALINDIA.NS", "POWERGRID.NS", "DRREDDY.NS", "CIPLA.NS", "EICHERMOT.NS", "HEROMOTOCO.NS", "HINDALCO.NS", "INDUSINDBK.NS",
  "SHREECEM.NS", "BPCL.NS", "ONGC.NS", "GRASIM.NS", "IOC.NS", "HDFCLIFE.NS", "SBILIFE.NS", "BAJAJ-AUTO.NS", "BAJAJFINSV.NS",
  "BRITANNIA.NS", "HDFC.NS", "UPL.NS", "BOSCHLTD.NS", "ABB.NS", "APOLLOHOSP.NS", "AMBUJACEM.NS", "ADANIGREEN.NS", "BIOCON.NS",
  "BEL.NS", "BANKBARODA.NS", "BANDHANBNK.NS", "CANBK.NS", "CHOLAFIN.NS", "COLPAL.NS", "DABUR.NS", "DLF.NS", "GODREJCP.NS", "GAIL.NS",
  "HAVELLS.NS", "ICICIPRULI.NS", "INDIGO.NS", "LTIM.NS", "LTTS.NS", "L&TFH.NS", "LICI.NS", "MCDOWELL-N.NS", "MFSL.NS", "MUTHOOTFIN.NS",
  "NAUKRI.NS", "NHPC.NS", "NMDC.NS", "OFSS.NS", "PAGEIND.NS", "PETRONET.NS", "PIDILITIND.NS", "PIIND.NS", "PFC.NS", "RECLTD.NS",
  "SAIL.NS", "SIEMENS.NS", "SRF.NS", "TORNTPHARM.NS", "TRENT.NS", "TVSMOTOR.NS", "UBL.NS", "VOLTAS.NS", "ZYDUSLIFE.NS",
  "AUROPHARMA.NS", "ALKEM.NS", "INDUSTOWER.NS", "IOCL.NS", "JINDALSTEL.NS"
];

export default function StrategiesForm({ onSave, onCancel, initialValues }) {
  const [form, setForm] = useState({
    strategyName: "",
    strategyScript: "",
    symbolList: [],
    startDate: "",
    endDate: "",
    initialCapital: "", 
    symbol: ""
  });
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    if (initialValues) {
      let parsedParams = {};
      try {
        parsedParams = initialValues.parametersJson ? JSON.parse(initialValues.parametersJson) : {};
      } catch (e) {
        console.error('Invalid JSON in parametersJson:', e);
      }

      setForm({
        strategyName: initialValues.strategyName || "",
        strategyScript: initialValues.strategyScript || "",
        symbolList: initialValues.symbolList || [],
        startDate: initialValues.startDate || "",
        endDate: initialValues.endDate || "",
        initialCapital: initialValues.initialCapital || "",
        symbol: initialValues.symbol || ""
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
      symbol: form.symbol,
      status: "not started",
      resultJson: null
    };

    onSave(newStrategy);
  };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-teal-700 text-center mb-4">
        {initialValues ? 'Edit Strategy' : 'Create New Strategy'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          <label className="text-sm font-medium text-gray-700">Strategy Name</label>
          <input
            className="border p-2 rounded-lg shadow-sm"
            type="text"
            name="strategyName"
            value={form.strategyName}
            onChange={handleChange}
            required
          />

          <label className="text-sm font-medium text-gray-700">Select Symbols</label>
          <div className="relative">
            <div
              className="border p-2 rounded-lg shadow-sm bg-white cursor-pointer"
              onClick={() => setDropdownVisible(!dropdownVisible)}
            >
              {form.symbolList.length > 0 ? `${form.symbolList.length} selected` : 'Click to Select...'}
            </div>
            {dropdownVisible && (
              <div className="absolute z-10 w-full bg-white border mt-1 rounded shadow-lg max-h-60 overflow-y-auto p-2 space-y-2">
                <div>
                  <div className="text-gray-600 font-semibold mb-1">Indices</div>
                  {INDICES.map((symbol) => (
                    <label key={symbol} className="flex items-center space-x-2 hover:bg-blue-50 p-1 rounded">
                      <input
                        type="checkbox"
                        checked={form.symbolList.includes(symbol)}
                        onChange={() => toggleSymbol(symbol)}
                      />
                      <span>{symbol}</span>
                    </label>
                  ))}
                </div>
                <div>
                  <div className="text-gray-600 font-semibold mb-1 mt-2">Stocks</div>
                  {COMPANIES.map((symbol) => (
                    <label key={symbol} className="flex items-center space-x-2 hover:bg-blue-50 p-1 rounded">
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
          </div>

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

          <label className="text-sm font-medium text-gray-700">Start Date</label>
          <input
            className="border p-2 rounded-lg shadow-sm"
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
          />

          <label className="text-sm font-medium text-gray-700">End Date</label>
          <input
            className="border p-2 rounded-lg shadow-sm"
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-4">
          <label className="text-sm font-medium text-gray-700">Strategy Script</label>
          <div className="h-64 border rounded-lg overflow-hidden bg-gray-50">
            <CodeMirror
              value={form.strategyScript}
              height="100%"
              theme="light"
              extensions={[javascript()]}
              onChange={(value) =>
                setForm((prev) => ({ ...prev, strategyScript: value }))
              }
              basicSetup={{ lineNumbers: true }}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="submit"
          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition"
        >
          {initialValues ? 'Update Strategy' : 'Save Strategy'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="ml-4 text-gray-600 hover:text-gray-800 px-4 py-2 rounded border border-gray-300 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
