import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const MutualFundPopup = ({ isOpen, onClose }) => {
  return (
    <Transition show={isOpen} as={Fragment}>
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
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Fund Name
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
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
                      required
                    />
                  </div>
                </div>

                {/* Add more fields as needed */}

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={onClose}
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