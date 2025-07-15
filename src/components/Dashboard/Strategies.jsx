// import { useState, useEffect } from 'react';
// import StrategiesForm from "./StrategiesForm";
// import StrategyResultModal from "../layouts/StrategyResultModal";
// import {
//   getAllStrategies,
//   saveStrategy,
//   deleteStrategy
// } from '../../api/strategiesApi';

// export default function Strategies() {
//   const [strategies, setStrategies] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [editingStrategy, setEditingStrategy] = useState(null);
//   const [showResult, setShowResult] = useState(null);

//   useEffect(() => {
//     loadStrategies();
//   }, []);

//   const loadStrategies = async () => {
//     try {
//       const response = await getAllStrategies();
//       setStrategies(response.data || []);
//     } catch (error) {
//       console.error('Error loading strategies:', error);
//     }
//   };

//   const handleSaveStrategy = async (strategy) => {
//     try {
//       await saveStrategy(strategy);
//       await loadStrategies();
//     } catch (error) {
//       console.error('Error saving strategy:', error);
//     } finally {
//       setShowForm(false);
//       setEditingStrategy(null);
//     }
//   };

//   const handleAddStrategy = () => {
//     setEditingStrategy(null);
//     setShowForm(true);
//   };

//   const handleEdit = (id) => {
//     const strategyToEdit = strategies.find((s) => s.id === id);
//     if (strategyToEdit) {
//       setEditingStrategy(strategyToEdit);
//       setShowForm(true);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (confirm('Are you sure you want to delete this strategy?')) {
//       try {
//         await deleteStrategy(id);
//         await loadStrategies();
//       } catch (error) {
//         console.error('Error deleting strategy:', error);
//       }
//     }
//   };

//   const handleStartSimulation = (id) => {
//     setStrategies(prev =>
//       prev.map(s =>
//         s.id === id ? { ...s, status: 'running' } : s
//       )
//     );

//     setTimeout(() => {
//       setStrategies(prev =>
//         prev.map(s =>
//           s.id === id
//             ? {
//                 ...s,
//                 status: 'completed',
//                 result: {
//                   summary: 'Simulation completed successfully.',
//                   pnl: `₹${(Math.random() * 20000 + 5000).toFixed(0)}`,
//                   trades: Math.floor(Math.random() * 20) + 5
//                 }
//               }
//             : s
//         )
//       );
//     }, 3000);
//   };

//   const handleStopSimulation = (id) => {
//     setStrategies(prev =>
//       prev.map(s =>
//         s.id === id ? { ...s, status: 'stopped' } : s
//       )
//     );
//   };

//   return (
//     <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl shadow-inner">
//       <div className="max-w-7xl mx-auto px-6 py-6">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
//             Your Strategies
//           </h2>
//           <button
//             onClick={handleAddStrategy}
//             className="px-5 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition"
//           >
//             + Add Strategy
//           </button>
//         </div>

//         <div className="bg-white overflow-x-auto border rounded-xl shadow-sm">
//           <table className="min-w-full text-sm text-left">
//             <thead className="bg-gray-100 text-gray-700">
//               <tr>
//                 <th className="px-4 py-3 border-b">Name</th>
//                 <th className="px-4 py-3 border-b">Symbols</th>
//                 <th className="px-4 py-3 border-b">Status</th>
//                 <th className="px-4 py-3 border-b">Simulation</th>
//                 <th className="px-4 py-3 border-b">Result</th>
//                 <th className="px-4 py-3 border-b">Edit</th>
//                 <th className="px-4 py-3 border-b">Delete</th>
//               </tr>
//             </thead>
//             <tbody>
//               {strategies.map((strategy, index) => {
//                 const id = strategy.id ?? index;
//                 const name = strategy.strategyName || `Strategy ${index + 1}`;
//                 const symbols = strategy.symbolList || [];
//                 const status = strategy.status ? strategy.status.replace(/_/g, ' ') : 'Draft';

//                 return (
//                   <tr key={id} className="hover:bg-gray-50">
//                     <td className="px-4 py-3 border-b font-semibold">{name}</td>
//                     <td className="px-4 py-3 border-b">
//                       {symbols.length > 0 ? (
//                         symbols.length > 3
//                           ? `${symbols.slice(0, 2).join(', ')}...`
//                           : symbols.join(', ')
//                       ) : (
//                         <span className="text-gray-400">-</span>
//                       )}
//                     </td>
//                     <td className="px-4 py-3 border-b capitalize">{status}</td>
//                     <td className="px-4 py-3 border-b">
//                       {strategy.status === 'running' ? (
//                         <button
//                           onClick={() => handleStopSimulation(strategy.id)}
//                           className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition text-xs"
//                         >
//                           Stop
//                         </button>
//                       ) : (
//                         <button
//                           onClick={() => handleStartSimulation(strategy.id)}
//                           className="px-3 py-1 bg-teal-600 text-white rounded hover:bg-teal-700 transition text-xs"
//                           disabled={strategy.status === 'completed'}
//                         >
//                           Start
//                         </button>
//                       )}
//                     </td>
//                     <td className="px-4 py-3 border-b">
//                       {strategy.result && strategy.status === 'completed' ? (
//                         <button
//                           onClick={() => setShowResult(strategy.result)}
//                           className="text-indigo-600 hover:text-indigo-800 text-xs"
//                         >
//                           View
//                         </button>
//                       ) : (
//                         <span className="text-gray-400 text-xs">-</span>
//                       )}
//                     </td>
//                     <td className="px-4 py-3 border-b">
//                       <button
//                         onClick={() => handleEdit(strategy.id)}
//                         className="text-blue-600 hover:text-blue-800 text-xs"
//                       >
//                         Edit
//                       </button>
//                     </td>
//                     <td className="px-4 py-3 border-b">
//                       <button
//                         onClick={() => handleDelete(strategy.id)}
//                         className="text-red-600 hover:text-red-800 text-xs"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })}

//               {strategies.length === 0 && (
//                 <tr>
//                   <td colSpan="7" className="text-center py-6 text-gray-500">
//                     No strategies found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {showForm && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
//             <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6">
//               <button
//                 onClick={() => setShowForm(false)}
//                 className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
//                 aria-label="Close"
//               >
//                 &times;
//               </button>
//               <StrategiesForm
//                 initialValues={editingStrategy}
//                 onSave={handleSaveStrategy}
//                 onCancel={() => {
//                   setShowForm(false);
//                   setEditingStrategy(null);
//                 }}
//               />
//             </div>
//           </div>
//         )}

//         {showResult && (
//           <StrategyResultModal
//             result={showResult}
//             onClose={() => setShowResult(null)}
//           />
//         )}
//       </div>
//     </div>
//   );
// }


// import { useState, useEffect } from 'react';
// import StrategiesForm from "./StrategiesForm";
// import StrategyResultModal from "../layouts/StrategyResultModal";
// import {
//   getAllStrategies,
//   saveStrategy,
//   deleteStrategy,
//   startSimulation,
//   stopSimulation
// } from '../../api/strategiesApi';

// export default function Strategies() {
//   const [strategies, setStrategies] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [editingStrategy, setEditingStrategy] = useState(null);
//   const [showResult, setShowResult] = useState(null);

//   useEffect(() => {
//     loadStrategies();
//   }, []);

//   const loadStrategies = async () => {
//     try {
//       const response = await getAllStrategies();
//       setStrategies(response.data || []);
//     } catch (error) {
//       console.error('Error loading strategies:', error);
//     }
//   };

//   const handleSaveStrategy = async (strategy) => {
//     try {
//       await saveStrategy(strategy);
//       await loadStrategies();
//     } catch (error) {
//       console.error('Error saving strategy:', error);
//     } finally {
//       setShowForm(false);
//       setEditingStrategy(null);
//     }
//   };

//   const handleAddStrategy = () => {
//     setEditingStrategy(null);
//     setShowForm(true);
//   };

//   const handleEdit = (id) => {
//     const strategyToEdit = strategies.find((s) => s.id === id);
//     if (strategyToEdit) {
//       setEditingStrategy(strategyToEdit);
//       setShowForm(true);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (confirm('Are you sure you want to delete this strategy?')) {
//       try {
//         await deleteStrategy(id);
//         await loadStrategies();
//       } catch (error) {
//         console.error('Error deleting strategy:', error);
//       }
//     }
//   };

//   const handleStartSimulation = async (id) => {
//     try {
//       const response = await startSimulation(id);  // Call backend
//       console.log("✅ Backend Start Simulation Response:", response.data);  // Log in frontend
//       await loadStrategies();  // Reload updated list
//     } catch (error) {
//       console.error("❌ Error starting simulation:", error);
//     }
//   };

//   const handleStopSimulation = async (id) => {
//     try {
//       await stopSimulation(id);
//       await loadStrategies();
//     } catch (error) {
//       console.error("❌ Error stopping simulation:", error);
//     }
//   };

//   return (
//     <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl shadow-inner">
//       <div className="max-w-7xl mx-auto px-6 py-6">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
//             Your Strategies
//           </h2>
//           <button
//             onClick={handleAddStrategy}
//             className="px-5 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition"
//           >
//             + Add Strategy
//           </button>
//         </div>

//         <div className="bg-white overflow-x-auto border rounded-xl shadow-sm">
//           <table className="min-w-full text-sm text-left">
//             <thead className="bg-gray-100 text-gray-700">
//               <tr>
//                 <th className="px-4 py-3 border-b">Name</th>
//                 <th className="px-4 py-3 border-b">Symbols</th>
//                 <th className="px-4 py-3 border-b">Status</th>
//                 <th className="px-4 py-3 border-b">Simulation</th>
//                 <th className="px-4 py-3 border-b">Result</th>
//                 <th className="px-4 py-3 border-b">Edit</th>
//                 <th className="px-4 py-3 border-b">Delete</th>
//               </tr>
//             </thead>
//             <tbody>
//               {strategies.map((strategy, index) => {
//                 const id = strategy.id ?? index;
//                 const name = strategy.strategyName || `Strategy ${index + 1}`;
//                 const symbols = strategy.symbolList || [];
//                 const status = strategy.status ? strategy.status.replace(/_/g, ' ') : 'Draft';

//                 return (
//                   <tr key={id} className="hover:bg-gray-50">
//                     <td className="px-4 py-3 border-b font-semibold">{name}</td>
//                     <td className="px-4 py-3 border-b">
//                       {symbols.length > 0 ? (
//                         symbols.length > 3
//                           ? `${symbols.slice(0, 2).join(', ')}...`
//                           : symbols.join(', ')
//                       ) : (
//                         <span className="text-gray-400">-</span>
//                       )}
//                     </td>
//                     <td className="px-4 py-3 border-b capitalize">{status}</td>
//                     <td className="px-4 py-3 border-b">
//                       {strategy.status === 'running' ? (
//                         <button
//                           onClick={() => handleStopSimulation(strategy.id)}
//                           className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition text-xs"
//                         >
//                           Stop
//                         </button>
//                       ) : (
//                         <button
//                           onClick={() => handleStartSimulation(strategy.id)}
//                           className="px-3 py-1 bg-teal-600 text-white rounded hover:bg-teal-700 transition text-xs"
//                           disabled={strategy.status === 'completed'}
//                         >
//                           Start
//                         </button>
//                       )}
//                     </td>
//                     <td className="px-4 py-3 border-b">
//                       {strategy.result && strategy.status === 'completed' ? (
//                         <button
//                           onClick={() => setShowResult(strategy.result)}
//                           className="text-indigo-600 hover:text-indigo-800 text-xs"
//                         >
//                           View
//                         </button>
//                       ) : (
//                         <span className="text-gray-400 text-xs">-</span>
//                       )}
//                     </td>
//                     <td className="px-4 py-3 border-b">
//                       <button
//                         onClick={() => handleEdit(strategy.id)}
//                         className="text-blue-600 hover:text-blue-800 text-xs"
//                       >
//                         Edit
//                       </button>
//                     </td>
//                     <td className="px-4 py-3 border-b">
//                       <button
//                         onClick={() => handleDelete(strategy.id)}
//                         className="text-red-600 hover:text-red-800 text-xs"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })}

//               {strategies.length === 0 && (
//                 <tr>
//                   <td colSpan="7" className="text-center py-6 text-gray-500">
//                     No strategies found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {showForm && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
//             <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6">
//               <button
//                 onClick={() => setShowForm(false)}
//                 className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
//                 aria-label="Close"
//               >
//                 &times;
//               </button>
//               <StrategiesForm
//                 initialValues={editingStrategy}
//                 onSave={handleSaveStrategy}
//                 onCancel={() => {
//                   setShowForm(false);
//                   setEditingStrategy(null);
//                 }}
//               />
//             </div>
//           </div>
//         )}

//         {showResult && (
//           <StrategyResultModal
//             result={showResult}
//             onClose={() => setShowResult(null)}
//           />
//         )}
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from 'react';
import toast from "react-hot-toast";
import StrategiesForm from "./StrategiesForm";
import StrategyResultModal from "../layouts/StrategyResultModal";
import {
  getAllStrategies,
  saveStrategy,
  deleteStrategy,
  startSimulation,
  stopSimulation,
  getBacktestResult
} from '../../api/strategiesApi';

export default function Strategies() {
  const [strategies, setStrategies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingStrategy, setEditingStrategy] = useState(null);
  const [showResult, setShowResult] = useState(null);
  const [runningSimulations, setRunningSimulations] = useState({});

  useEffect(() => {
    loadStrategies();
  }, []);

  const loadStrategies = async () => {
    try {
      const response = await getAllStrategies();
      setStrategies(response.data || []);
    } catch (error) {
      console.error('Error loading strategies:', error);
    }
  };

  const handleSaveStrategy = async (strategy) => {
    try {
      await saveStrategy(strategy);
      await loadStrategies();
    } catch (error) {
      console.error('Error saving strategy:', error);
    } finally {
      setShowForm(false);
      setEditingStrategy(null);
    }
  };

  const handleAddStrategy = () => {
    setEditingStrategy(null);
    setShowForm(true);
  };

  const handleEdit = (id) => {
    const strategyToEdit = strategies.find((s) => s.id === id);
    if (strategyToEdit) {
      setEditingStrategy(strategyToEdit);
      setShowForm(true);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this strategy?')) {
      try {
        await deleteStrategy(id);
        await loadStrategies();
      } catch (error) {
        console.error('Error deleting strategy:', error);
      }
    }
  };

const handleStartSimulation = async (id) => {
  try {
    setRunningSimulations(prev => ({ ...prev, [id]: true }));

    // Show loading toast and save its ID
    const toastId = toast.loading("Running simulation...", { duration: Infinity });

    await startSimulation(id);

    await loadStrategies();

    toast.dismiss(toastId); // remove the loading toast
    toast.success("Simulation completed successfully!", { duration: 5000 });
  } catch (error) {
    toast.dismiss(); // dismiss all toasts in case of error
    toast.error("Failed to start simulation.");
    console.error("❌ Error starting simulation:", error);
  } finally {
    setRunningSimulations(prev => {
      const newState = { ...prev };
      delete newState[id];
      return newState;
    });
  }
};


  const handleStopSimulation = async (id) => {
    try {
      await stopSimulation(id);
      await loadStrategies();
    } catch (error) {
      console.error("❌ Error stopping simulation:", error);
    }
  };

  const handleViewResult = async (id) => {
    try {
      const response = await getBacktestResult(id);
      console.log("📊 Backtest Result Fetched:", response.data);
      setShowResult(response.data);
    } catch (error) {
      console.error("❌ Failed to fetch result:", error);
    }
  };

  return (
    <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl shadow-inner">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            Your Strategies
          </h2>
          <button
            onClick={handleAddStrategy}
            className="px-5 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition"
          >
            + Add Strategy
          </button>
        </div>

        <div className="bg-white overflow-x-auto border rounded-xl shadow-sm">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3 border-b">Name</th>
                <th className="px-4 py-3 border-b">Symbols</th>
                <th className="px-4 py-3 border-b">Status</th>
                <th className="px-4 py-3 border-b">Simulation</th>
                <th className="px-4 py-3 border-b">Result</th>
                <th className="px-4 py-3 border-b">Edit</th>
                <th className="px-4 py-3 border-b">Delete</th>
              </tr>
            </thead>
            <tbody>
              {strategies.map((strategy, index) => {
                const id = strategy.id ?? index;
                const name = strategy.strategyName || `Strategy ${index + 1}`;
                const symbols = strategy.symbolList || [];
                const status = strategy.status ? strategy.status.replace(/_/g, ' ') : 'Draft';

                return (
                  <tr key={id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 border-b font-semibold">{name}</td>
                    <td className="px-4 py-3 border-b">
                      {symbols.length > 0 ? (
                        symbols.length > 3
                          ? `${symbols.slice(0, 2).join(', ')}...`
                          : symbols.join(', ')
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 border-b capitalize">{status}</td>
                    <td className="px-4 py-3 border-b">
                      {strategy.status === 'running' ? (
                        <button
                          onClick={() => handleStopSimulation(strategy.id)}
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition text-xs"
                        >
                          Stop
                        </button>
                      ) : (
                        <button
                          onClick={() => handleStartSimulation(strategy.id)}
                          className="px-3 py-1 bg-teal-600 text-white rounded transition text-xs disabled:opacity-50"
                          disabled={strategy.status === 'completed' || runningSimulations[strategy.id]}
                        >
                          {runningSimulations[strategy.id] ? "Running..." : "Start"}
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-3 border-b">
                      {strategy.status === 'completed' ? (
                        <button
                          onClick={() => handleViewResult(strategy.id)}
                          className="text-indigo-600 hover:text-indigo-800 text-xs"
                        >
                          View
                        </button>
                      ) : (
                        <span className="text-gray-400 text-xs">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 border-b">
                      <button
                        onClick={() => handleEdit(strategy.id)}
                        className="text-blue-600 hover:text-blue-800 text-xs"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="px-4 py-3 border-b">
                      <button
                        onClick={() => handleDelete(strategy.id)}
                        className="text-red-600 hover:text-red-800 text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}

              {strategies.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-gray-500">
                    No strategies found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6">
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
                aria-label="Close"
              >
                &times;
              </button>
              <StrategiesForm
                initialValues={editingStrategy}
                onSave={handleSaveStrategy}
                onCancel={() => {
                  setShowForm(false);
                  setEditingStrategy(null);
                }}
              />
            </div>
          </div>
        )}

        {showResult && (
          <StrategyResultModal
            result={showResult}
            onClose={() => setShowResult(null)}
          />
        )}
      </div>
    </div>
  );
}
