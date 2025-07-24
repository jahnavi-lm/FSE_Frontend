import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

const MutualFundPopup = ({ isOpen, onClose, onSave }) => {
  // Controlled form states
  const [fundName, setFundName] = useState("");
  const [objective, setObjective] = useState("");
  const [aum, setAum] = useState("");
  const [nav, setNav] = useState("");
  const [numStocks, setNumStocks] = useState("");

  // Optional: Handle reset on close
  const handleClose = () => {
    setFundName("");
    setObjective("");
    setAum("");
    setNav("");
    setNumStocks("");
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Build mutual fund object
    const data = {
      fundName,
      objective,
      aum: Number(aum),
      nav: Number(nav),
      numStocks: Number(numStocks),
    };
    // Call parent or do API call
    if (onSave) onSave(data);
    handleClose();
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-2xl rounded bg-white p-6 shadow-xl">
              <Dialog.Title className="text-lg font-bold mb-4">
                Create Mutual Fund
              </Dialog.Title>

              {/* Form Fields */}
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Fund Name
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                    value={fundName}
                    onChange={(e) => setFundName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Objective
                  </label>
                  <textarea
                    rows={3}
                    className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                    value={objective}
                    onChange={(e) => setObjective(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700">
                      AUM
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                      value={aum}
                      onChange={(e) => setAum(e.target.value)}
                      required
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700">
                      NAV
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                      value={nav}
                      onChange={(e) => setNav(e.target.value)}
                      required
                    />
                  </div>
                </div>
                {/* ----- NEW FIELD for Number of Stocks ----- */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                   Units to Sell
                  </label>
                  <input
                    type="number"
                    min="1"
                    className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                    value={numStocks}
                    onChange={(e) => setNumStocks(e.target.value)}
                    required
                  />
                </div>
                {/* ----- END NEW FIELD ----- */}

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-teal-600 text-white hover:bg-teal-700"
                  >
                    Save
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default MutualFundPopup;
