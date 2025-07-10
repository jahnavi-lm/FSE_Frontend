// import React, { useState, useEffect, Fragment } from "react";
// import { Dialog, Transition } from "@headlessui/react";

// const EditMutualFundPopup = ({ show, onClose, fundData, onSaveSuccess }) => {
//   const [name, setName] = useState("");
//   const [type, setType] = useState("EQUITY");
//   const [objective, setObjective] = useState("");
//   const [riskLevel, setRiskLevel] = useState("MODERATE");
//   const [minInvestment, setMinInvestment] = useState("");
//   const [category, setCategory] = useState("");
//   const [benchmarkIndex, setBenchmarkIndex] = useState("");
//   const [aum, setAum] = useState("");
//   const [currentNav, setCurrentNav] = useState("");
//   const [expenseRatio, setExpenseRatio] = useState("");
//   const [exitLoad, setExitLoad] = useState("");
//   const [lockInPeriod, setLockInPeriod] = useState("");
//   const [minSipAmount, setMinSipAmount] = useState("");
//   const [launchDate, setLaunchDate] = useState("");
//   const [status, setStatus] = useState("ACTIVE");

//   useEffect(() => {
//     if (fundData) {
//       setName(fundData.name || "");
//       setType(fundData.type || "EQUITY");
//       setObjective(fundData.objective || "");
//       setRiskLevel(fundData.riskLevel || "MODERATE");
//       setMinInvestment(fundData.minInvestment || "");
//       setCategory(fundData.category || "");
//       setBenchmarkIndex(fundData.benchmarkIndex || "");
//       setAum(fundData.aum || "");
//       setCurrentNav(fundData.currentNav || "");
//       setExpenseRatio(fundData.expenseRatio || "");
//       setExitLoad(fundData.exitLoad || "");
//       setLockInPeriod(fundData.lockInPeriod || "");
//       setMinSipAmount(fundData.minSipAmount || "");
//       setLaunchDate(fundData.launchDate || "");
//       setStatus(fundData.status || "ACTIVE");
//     }
//   }, [fundData]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // TODO: Replace with PUT API call
//     console.log("Updated data:", {
//       name,
//       type,
//       objective,
//       riskLevel,
//       minInvestment,
//       category,
//       benchmarkIndex,
//       aum,
//       currentNav,
//       expenseRatio,
//       exitLoad,
//       lockInPeriod,
//       minSipAmount,
//       launchDate,
//       status,
//     });
//     onSaveSuccess?.();
//   };

// return (
//   <Transition appear show={show} as={Fragment}>
//     <Dialog as="div" className="relative z-50" onClose={onClose}>
//       <Transition.Child
//         as={Fragment}
//         enter="ease-out duration-200"
//         enterFrom="opacity-0"
//         enterTo="opacity-100"
//         leave="ease-in duration-150"
//         leaveFrom="opacity-100"
//         leaveTo="opacity-0"
//       >
//         <div className="fixed inset-0 bg-black/30" />
//       </Transition.Child>

//       <div className="fixed inset-0 overflow-y-auto">
//         <div className="flex min-h-full items-center justify-center p-4 text-center">
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-200"
//             enterFrom="opacity-0 scale-95"
//             enterTo="opacity-100 scale-100"
//             leave="ease-in duration-150"
//             leaveFrom="opacity-100 scale-100"
//             leaveTo="opacity-0 scale-95"
//           >
//             <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
//               <Dialog.Title className="text-lg font-bold text-gray-800 mb-4">
//                 ✏️ Edit Mutual Fund
//               </Dialog.Title>

//               <form onSubmit={handleSubmit} className="space-y-5">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium">Name *</label>
//                     <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="e.g. Axis Bluechip Fund" className="input w-full border rounded p-2" />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium">Type *</label>
//                     <select value={type} onChange={(e) => setType(e.target.value)} required className="input w-full border rounded p-2">
//                       <option value="EQUITY">Equity</option>
//                       <option value="DEBT">Debt</option>
//                       <option value="HYBRID">Hybrid</option>
//                       <option value="ELSS">ELSS</option>
//                       <option value="INDEX">Index</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium">Risk Level *</label>
//                     <select value={riskLevel} onChange={(e) => setRiskLevel(e.target.value)} required className="input w-full border rounded p-2">
//                       <option value="LOW">Low</option>
//                       <option value="MODERATE">Moderate</option>
//                       <option value="HIGH">High</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium">Status *</label>
//                     <select value={status} onChange={(e) => setStatus(e.target.value)} required className="input w-full border rounded p-2">
//                       <option value="ACTIVE">Active</option>
//                       <option value="CLOSED">Closed</option>
//                       <option value="MERGED">Merged</option>
//                     </select>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium">Objective *</label>
//                   <textarea value={objective} onChange={(e) => setObjective(e.target.value)} required placeholder="e.g. To generate long-term capital growth" className="input w-full border rounded p-2" />
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium">AUM</label>
//                     <input type="number" value={aum} onChange={(e) => setAum(e.target.value)} placeholder="e.g. 12000.50" className="input w-full border rounded p-2" />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium">Current NAV</label>
//                     <input type="number" value={currentNav} onChange={(e) => setCurrentNav(e.target.value)} placeholder="e.g. 52.45" className="input w-full border rounded p-2" />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium">Expense Ratio</label>
//                     <input type="number" value={expenseRatio} onChange={(e) => setExpenseRatio(e.target.value)} placeholder="e.g. 1.25" className="input w-full border rounded p-2" />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium">Exit Load</label>
//                     <input type="number" value={exitLoad} onChange={(e) => setExitLoad(e.target.value)} placeholder="e.g. 1.00" className="input w-full border rounded p-2" />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium">Lock-in Period</label>
//                     <input type="number" value={lockInPeriod} onChange={(e) => setLockInPeriod(e.target.value)} placeholder="e.g. 36 (in months)" className="input w-full border rounded p-2" />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium">Min Investment *</label>
//                     <input type="number" value={minInvestment} onChange={(e) => setMinInvestment(e.target.value)} required placeholder="e.g. 5000" className="input w-full border rounded p-2" />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium">Min SIP Amount</label>
//                     <input type="number" value={minSipAmount} onChange={(e) => setMinSipAmount(e.target.value)} placeholder="e.g. 500" className="input w-full border rounded p-2" />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium">Benchmark Index *</label>
//                     <input type="text" value={benchmarkIndex} onChange={(e) => setBenchmarkIndex(e.target.value)} required placeholder="e.g. NIFTY 50" className="input w-full border rounded p-2" />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium">Launch Date</label>
//                     <input type="date" value={launchDate} onChange={(e) => setLaunchDate(e.target.value)} className="input w-full border rounded p-2" />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium">Category *</label>
//                     <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required placeholder="e.g. Large Cap" className="input w-full border rounded p-2" />
//                   </div>
//                 </div>

//                 <div className="mt-6 flex justify-end gap-3">
//                   <button type="button" onClick={onClose} className="px-4 py-2 rounded-md text-sm bg-gray-200 text-gray-700 hover:bg-gray-300">Cancel</button>
//                   <button type="submit" className="px-4 py-2 rounded-md text-sm bg-blue-600 text-white hover:bg-blue-700">Save Changes</button>
//                 </div>
//               </form>
//             </Dialog.Panel>
//           </Transition.Child>
//         </div>
//       </div>
//     </Dialog>
//   </Transition>
// );

// };

// export default EditMutualFundPopup;


import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";

const EditMutualFundPopup = ({ show, onClose, fundData, onSaveSuccess }) => {
  const [formLoaded, setFormLoaded] = useState(false);

  const [name, setName] = useState("");
  const [type, setType] = useState("EQUITY");
  const [objective, setObjective] = useState("");
  const [riskLevel, setRiskLevel] = useState("MODERATE");
  const [minInvestment, setMinInvestment] = useState("");
  const [category, setCategory] = useState("");
  const [benchmarkIndex, setBenchmarkIndex] = useState("");
  const [aum, setAum] = useState("");
  const [currentNav, setCurrentNav] = useState("");
  const [expenseRatio, setExpenseRatio] = useState("");
  const [exitLoad, setExitLoad] = useState("");
  const [lockInPeriod, setLockInPeriod] = useState("");
  const [minSipAmount, setMinSipAmount] = useState("");
  const [launchDate, setLaunchDate] = useState("");
  const [status, setStatus] = useState("ACTIVE");
  const [companiesInvestedIn, setCompaniesInvestedIn] = useState([]);

  useEffect(() => {
    if (fundData && show) {
      setName(fundData.name || "");
      setType(fundData.type || "EQUITY");
      setObjective(fundData.objective || "");
      setRiskLevel(fundData.riskLevel || "MODERATE");
      setMinInvestment(fundData.minInvestment || "");
      setCategory(fundData.category || "");
      setBenchmarkIndex(fundData.benchmarkIndex || "");
      setAum(fundData.aum || "");
      setCurrentNav(fundData.currentNav || "");
      setExpenseRatio(fundData.expenseRatio || "");
      setExitLoad(fundData.exitLoad || "");
      setLockInPeriod(fundData.lockInPeriod || "");
      setMinSipAmount(fundData.minSipAmount || "");
      setLaunchDate(fundData.launchDate || "");
      setStatus(fundData.status || "ACTIVE");
      setCompaniesInvestedIn(fundData.companiesInvestedIn || []);
      setFormLoaded(true);
    }
  }, [fundData, show]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fundData?.id) {
      console.error("Fund ID is missing.");
      return;
    }

    const payload = {
      name,
      type,
      objective,
      riskLevel,
      minInvestment,
      category,
      benchmarkIndex,
      aum,
      currentNav,
      expenseRatio,
      exitLoad,
      lockInPeriod,
      minSipAmount,
      launchDate,
      status,
      // companiesInvestedIn, // must be array of objects { companyName: string }
    };

    console.log("Sending PUT payload:", payload);

    try {
      const response = await axios.put(
        `http://localhost:8080/api/fund-schemes/${fundData.id}`,
        payload
      );

      console.log("Update successful:", response.data);
      onSaveSuccess?.(); // Notify parent
      onClose(); // Close modal
    } catch (error) {
      if (error.response) {
        console.error("Update failed:", JSON.stringify(error.response.data, null, 2));
      } else {
        console.error("Error while updating:", error.message);
      }
    }
  };

  if (!show || !formLoaded) return null;

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title className="text-lg font-bold text-gray-800 mb-4">
                  ✏️ Edit Mutual Fund
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium">Name *</label>
                      <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="input w-full border rounded p-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Type *</label>
                      <select value={type} onChange={(e) => setType(e.target.value)} required className="input w-full border rounded p-2">
                        <option value="EQUITY">Equity</option>
                        <option value="DEBT">Debt</option>
                        <option value="HYBRID">Hybrid</option>
                        <option value="ELSS">ELSS</option>
                        <option value="INDEX">Index</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Risk Level *</label>
                      <select value={riskLevel} onChange={(e) => setRiskLevel(e.target.value)} required className="input w-full border rounded p-2">
                        <option value="LOW">Low</option>
                        <option value="MODERATE">Moderate</option>
                        <option value="HIGH">High</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Status *</label>
                      <select value={status} onChange={(e) => setStatus(e.target.value)} required className="input w-full border rounded p-2">
                        <option value="ACTIVE">Active</option>
                        <option value="CLOSED">Closed</option>
                        <option value="MERGED">Merged</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Objective *</label>
                    <textarea value={objective} onChange={(e) => setObjective(e.target.value)} required className="input w-full border rounded p-2" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium">AUM</label>
                      <input type="number" value={aum} onChange={(e) => setAum(e.target.value)} className="input w-full border rounded p-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Current NAV</label>
                      <input type="number" value={currentNav} onChange={(e) => setCurrentNav(e.target.value)} className="input w-full border rounded p-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Expense Ratio</label>
                      <input type="number" value={expenseRatio} onChange={(e) => setExpenseRatio(e.target.value)} className="input w-full border rounded p-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Exit Load</label>
                      <input type="number" value={exitLoad} onChange={(e) => setExitLoad(e.target.value)} className="input w-full border rounded p-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Lock-in Period</label>
                      <input type="number" value={lockInPeriod} onChange={(e) => setLockInPeriod(e.target.value)} className="input w-full border rounded p-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Min Investment *</label>
                      <input type="number" value={minInvestment} onChange={(e) => setMinInvestment(e.target.value)} required className="input w-full border rounded p-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Min SIP Amount</label>
                      <input type="number" value={minSipAmount} onChange={(e) => setMinSipAmount(e.target.value)} className="input w-full border rounded p-2" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium">Benchmark Index *</label>
                      <input type="text" value={benchmarkIndex} onChange={(e) => setBenchmarkIndex(e.target.value)} required className="input w-full border rounded p-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Launch Date</label>
                      <input type="date" value={launchDate} onChange={(e) => setLaunchDate(e.target.value)} className="input w-full border rounded p-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Category *</label>
                      <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required className="input w-full border rounded p-2" />
                    </div>
                    {/* <div>
                      <label className="block text-sm font-medium">Companies Invested In *</label>
                      <input
                        type="text"
                        value={companiesInvestedIn.map((ci) => ci.companyName).join(", ")}
                        onChange={(e) =>
                          setCompaniesInvestedIn(
                            e.target.value
                              .split(",")
                              .map((name) => name.trim())
                              .filter(Boolean)
                              .map((name) => ({ companyName: name }))
                          )
                        }
                        placeholder="e.g. Reliance, TCS, Infosys"
                        className="input w-full border rounded p-2"
                        required
                      />
                    </div> */}
                  </div>

                  <div className="mt-6 flex justify-end gap-3">
                    <button type="button" onClick={onClose} className="px-4 py-2 rounded-md text-sm bg-gray-200 text-gray-700 hover:bg-gray-300">Cancel</button>
                    <button type="submit" className="px-4 py-2 rounded-md text-sm bg-blue-600 text-white hover:bg-blue-700">Save Changes</button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditMutualFundPopup;

// import React, { useState, useEffect, Fragment } from "react";
// import axios from "axios";
// import { Dialog, Transition } from "@headlessui/react";

// const EditMutualFundPopup = ({ show, onClose, fundData, onSaveSuccess }) => {
//   const [name, setName] = useState("");
//   const [type, setType] = useState("EQUITY");
//   const [objective, setObjective] = useState("");
//   const [riskLevel, setRiskLevel] = useState("MODERATE");
//   const [minInvestment, setMinInvestment] = useState("");
//   const [category, setCategory] = useState("");
//   const [benchmarkIndex, setBenchmarkIndex] = useState("");
//   const [aum, setAum] = useState("");
//   const [currentNav, setCurrentNav] = useState("");
//   const [expenseRatio, setExpenseRatio] = useState("");
//   const [exitLoad, setExitLoad] = useState("");
//   const [lockInPeriod, setLockInPeriod] = useState("");
//   const [minSipAmount, setMinSipAmount] = useState("");
//   const [launchDate, setLaunchDate] = useState("");
//   const [status, setStatus] = useState("ACTIVE");

//   useEffect(() => {
//     if (fundData) {
//       setName(fundData.name || "");
//       setType(fundData.type || "EQUITY");
//       setObjective(fundData.objective || "");
//       setRiskLevel(fundData.riskLevel || "MODERATE");
//       setMinInvestment(fundData.minInvestment || "");
//       setCategory(fundData.category || "");
//       setBenchmarkIndex(fundData.benchmarkIndex || "");
//       setAum(fundData.aum || "");
//       setCurrentNav(fundData.currentNav || "");
//       setExpenseRatio(fundData.expenseRatio || "");
//       setExitLoad(fundData.exitLoad || "");
//       setLockInPeriod(fundData.lockInPeriod || "");
//       setMinSipAmount(fundData.minSipAmount || "");
//       setLaunchDate(fundData.launchDate || "");
//       setStatus(fundData.status || "ACTIVE");
//     }
//   }, [fundData]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const updatedFund = {
//       name,
//       type,
//       objective,
//       riskLevel,
//       minInvestment,
//       category,
//       benchmarkIndex,
//       aum,
//       currentNav,
//       expenseRatio,
//       exitLoad,
//       lockInPeriod,
//       minSipAmount,
//       launchDate,
//       status,
//     };

//     try {
//       await axios.put(`http://localhost:8080/api/fund-schemes/${fundData.id}`, updatedFund);
//       console.log("Mutual Fund updated successfully");
//       onSaveSuccess?.();
//       onClose();
//     } catch (error) {
//       console.error("Error updating mutual fund:", error);
//       alert("Failed to update mutual fund. Please try again.");
//     }
//   };

//   return (
//     <Transition appear show={show} as={Fragment}>
//       <Dialog as="div" className="relative z-50" onClose={onClose}>
//         <Transition.Child
//           as={Fragment}
//           enter="ease-out duration-200"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="ease-in duration-150"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <div className="fixed inset-0 bg-black/30" />
//         </Transition.Child>

//         <div className="fixed inset-0 overflow-y-auto">
//           <div className="flex min-h-full items-center justify-center p-4 text-center">
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-200"
//               enterFrom="opacity-0 scale-95"
//               enterTo="opacity-100 scale-100"
//               leave="ease-in duration-150"
//               leaveFrom="opacity-100 scale-100"
//               leaveTo="opacity-0 scale-95"
//             >
//               <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
//                 <Dialog.Title className="text-lg font-bold text-gray-800 mb-4">
//                   ✏️ Edit Mutual Fund
//                 </Dialog.Title>

//                 <form onSubmit={handleSubmit} className="space-y-5">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium">Name *</label>
//                       <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="input w-full border rounded p-2" />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium">Type *</label>
//                       <select value={type} onChange={(e) => setType(e.target.value)} required className="input w-full border rounded p-2">
//                         <option value="EQUITY">Equity</option>
//                         <option value="DEBT">Debt</option>
//                         <option value="HYBRID">Hybrid</option>
//                         <option value="ELSS">ELSS</option>
//                         <option value="INDEX">Index</option>
//                       </select>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium">Risk Level *</label>
//                       <select value={riskLevel} onChange={(e) => setRiskLevel(e.target.value)} required className="input w-full border rounded p-2">
//                         <option value="LOW">Low</option>
//                         <option value="MODERATE">Moderate</option>
//                         <option value="HIGH">High</option>
//                       </select>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium">Status *</label>
//                       <select value={status} onChange={(e) => setStatus(e.target.value)} required className="input w-full border rounded p-2">
//                         <option value="ACTIVE">Active</option>
//                         <option value="CLOSED">Closed</option>
//                         <option value="MERGED">Merged</option>
//                       </select>
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium">Objective *</label>
//                     <textarea value={objective} onChange={(e) => setObjective(e.target.value)} required className="input w-full border rounded p-2" />
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium">AUM</label>
//                       <input type="number" value={aum} onChange={(e) => setAum(e.target.value)} className="input w-full border rounded p-2" />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium">Current NAV</label>
//                       <input type="number" value={currentNav} onChange={(e) => setCurrentNav(e.target.value)} className="input w-full border rounded p-2" />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium">Expense Ratio</label>
//                       <input type="number" value={expenseRatio} onChange={(e) => setExpenseRatio(e.target.value)} className="input w-full border rounded p-2" />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium">Exit Load</label>
//                       <input type="number" value={exitLoad} onChange={(e) => setExitLoad(e.target.value)} className="input w-full border rounded p-2" />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium">Lock-in Period</label>
//                       <input type="number" value={lockInPeriod} onChange={(e) => setLockInPeriod(e.target.value)} className="input w-full border rounded p-2" />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium">Min Investment *</label>
//                       <input type="number" value={minInvestment} onChange={(e) => setMinInvestment(e.target.value)} required className="input w-full border rounded p-2" />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium">Min SIP Amount</label>
//                       <input type="number" value={minSipAmount} onChange={(e) => setMinSipAmount(e.target.value)} className="input w-full border rounded p-2" />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium">Benchmark Index *</label>
//                       <input type="text" value={benchmarkIndex} onChange={(e) => setBenchmarkIndex(e.target.value)} required className="input w-full border rounded p-2" />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium">Launch Date</label>
//                       <input type="date" value={launchDate} onChange={(e) => setLaunchDate(e.target.value)} className="input w-full border rounded p-2" />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium">Category *</label>
//                       <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required className="input w-full border rounded p-2" />
//                     </div>
//                   </div>

//                   <div className="mt-6 flex justify-end gap-3">
//                     <button type="button" onClick={onClose} className="px-4 py-2 rounded-md text-sm bg-gray-200 text-gray-700 hover:bg-gray-300">Cancel</button>
//                     <button type="submit" className="px-4 py-2 rounded-md text-sm bg-blue-600 text-white hover:bg-blue-700">Save Changes</button>
//                   </div>
//                 </form>
//               </Dialog.Panel>
//             </Transition.Child>
//           </div>
//         </div>
//       </Dialog>
//     </Transition>
//   );
// };

// export default EditMutualFundPopup;


// import React, { useState, useEffect, Fragment } from "react";
// import axios from "axios";
// import { Dialog, Transition } from "@headlessui/react";

// const EditMutualFundPopup = ({ show, onClose, fundData, onSaveSuccess }) => {
//   const [name, setName] = useState("");
//   const [type, setType] = useState("EQUITY");
//   const [objective, setObjective] = useState("");
//   const [riskLevel, setRiskLevel] = useState("MODERATE");
//   const [minInvestment, setMinInvestment] = useState("");
//   const [category, setCategory] = useState("");
//   const [benchmarkIndex, setBenchmarkIndex] = useState("");
//   const [aum, setAum] = useState("");
//   const [currentNav, setCurrentNav] = useState("");
//   const [expenseRatio, setExpenseRatio] = useState("");
//   const [exitLoad, setExitLoad] = useState("");
//   const [lockInPeriod, setLockInPeriod] = useState("");
//   const [minSipAmount, setMinSipAmount] = useState("");
//   const [launchDate, setLaunchDate] = useState("");
//   const [status, setStatus] = useState("ACTIVE");

//   useEffect(() => {
//     if (fundData) {
//       setName(fundData.name || "");
//       setType(fundData.type || "EQUITY");
//       setObjective(fundData.objective || "");
//       setRiskLevel(fundData.riskLevel || "MODERATE");
//       setMinInvestment(fundData.minInvestment || "");
//       setCategory(fundData.category || "");
//       setBenchmarkIndex(fundData.benchmarkIndex || "");
//       setAum(fundData.aum || "");
//       setCurrentNav(fundData.currentNav || "");
//       setExpenseRatio(fundData.expenseRatio || "");
//       setExitLoad(fundData.exitLoad || "");
//       setLockInPeriod(fundData.lockInPeriod || "");
//       setMinSipAmount(fundData.minSipAmount || "");
//       setLaunchDate(fundData.launchDate || "");
//       setStatus(fundData.status || "ACTIVE");
//     }
//   }, [fundData]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const updatedFund = {
//       name,
//       type,
//       objective,
//       aum: aum || null,
//       currentNav: currentNav || null,
//       riskLevel,
//       expenseRatio: expenseRatio || null,
//       exitLoad: exitLoad || null,
//       lockInPeriod: lockInPeriod || null,
//       minInvestment,
//       minSipAmount: minSipAmount || null,
//       benchmarkIndex,
//       launchDate: launchDate || null,
//       category,
//       status,
//     };

//     try {
//       await axios.put(`http://localhost:8080/api/fund-schemes/${fundData.id}`, updatedFund);
//       onSaveSuccess?.();
//       onClose();
//     } catch (error) {
//       console.error("Error updating mutual fund:", error.response || error);
//       alert("Failed to update mutual fund. Check backend logs for details.");
//     }
//   };

//   return (
//     <Transition appear show={show} as={Fragment}>
//       <Dialog as="div" className="relative z-50" onClose={onClose}>
//         <Transition.Child
//           as={Fragment}
//           enter="ease-out duration-200"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="ease-in duration-150"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <div className="fixed inset-0 bg-black/30" />
//         </Transition.Child>

//         <div className="fixed inset-0 overflow-y-auto">
//           <div className="flex min-h-full items-center justify-center p-4 text-center">
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-200"
//               enterFrom="opacity-0 scale-95"
//               enterTo="opacity-100 scale-100"
//               leave="ease-in duration-150"
//               leaveFrom="opacity-100 scale-100"
//               leaveTo="opacity-0 scale-95"
//             >
//               <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
//                 <Dialog.Title className="text-lg font-bold text-gray-800 mb-4">
//                   ✏️ Edit Mutual Fund
//                 </Dialog.Title>

//                 <form onSubmit={handleSubmit} className="space-y-5">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium">Name *</label>
//                       <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="input w-full border rounded p-2" />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium">Type *</label>
//                       <select value={type} onChange={(e) => setType(e.target.value)} required className="input w-full border rounded p-2">
//                         <option value="EQUITY">Equity</option>
//                         <option value="DEBT">Debt</option>
//                         <option value="HYBRID">Hybrid</option>
//                         <option value="ELSS">ELSS</option>
//                         <option value="INDEX">Index</option>
//                       </select>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium">Risk Level *</label>
//                       <select value={riskLevel} onChange={(e) => setRiskLevel(e.target.value)} required className="input w-full border rounded p-2">
//                         <option value="LOW">Low</option>
//                         <option value="MODERATE">Moderate</option>
//                         <option value="HIGH">High</option>
//                       </select>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium">Status *</label>
//                       <select value={status} onChange={(e) => setStatus(e.target.value)} required className="input w-full border rounded p-2">
//                         <option value="ACTIVE">Active</option>
//                         <option value="CLOSED">Closed</option>
//                         <option value="MERGED">Merged</option>
//                       </select>
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium">Objective *</label>
//                     <textarea value={objective} onChange={(e) => setObjective(e.target.value)} required className="input w-full border rounded p-2" />
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium">AUM</label>
//                       <input type="number" value={aum} onChange={(e) => setAum(e.target.value)} className="input w-full border rounded p-2" />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium">Current NAV</label>
//                       <input type="number" value={currentNav} onChange={(e) => setCurrentNav(e.target.value)} className="input w-full border rounded p-2" />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium">Expense Ratio</label>
//                       <input type="number" value={expenseRatio} onChange={(e) => setExpenseRatio(e.target.value)} className="input w-full border rounded p-2" />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium">Exit Load</label>
//                       <input type="number" value={exitLoad} onChange={(e) => setExitLoad(e.target.value)} className="input w-full border rounded p-2" />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium">Lock-in Period</label>
//                       <input type="number" value={lockInPeriod} onChange={(e) => setLockInPeriod(e.target.value)} className="input w-full border rounded p-2" />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium">Min Investment *</label>
//                       <input type="number" value={minInvestment} onChange={(e) => setMinInvestment(e.target.value)} required className="input w-full border rounded p-2" />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium">Min SIP Amount</label>
//                       <input type="number" value={minSipAmount} onChange={(e) => setMinSipAmount(e.target.value)} className="input w-full border rounded p-2" />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium">Benchmark Index *</label>
//                       <input type="text" value={benchmarkIndex} onChange={(e) => setBenchmarkIndex(e.target.value)} required className="input w-full border rounded p-2" />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium">Launch Date</label>
//                       <input type="date" value={launchDate} onChange={(e) => setLaunchDate(e.target.value)} className="input w-full border rounded p-2" />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium">Category *</label>
//                       <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required className="input w-full border rounded p-2" />
//                     </div>
//                   </div>

//                   <div className="mt-6 flex justify-end gap-3">
//                     <button type="button" onClick={onClose} className="px-4 py-2 rounded-md text-sm bg-gray-200 text-gray-700 hover:bg-gray-300">Cancel</button>
//                     <button type="submit" className="px-4 py-2 rounded-md text-sm bg-blue-600 text-white hover:bg-blue-700">Save Changes</button>
//                   </div>
//                 </form>
//               </Dialog.Panel>
//             </Transition.Child>
//           </div>
//         </div>
//       </Dialog>
//     </Transition>
//   );
// };

// export default EditMutualFundPopup;
