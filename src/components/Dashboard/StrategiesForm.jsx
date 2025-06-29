import { useState, useEffect } from 'react';
import { strategyTypes, strategyFieldSchema } from './strategyFields';

export default function StrategiesForm({ onSave, onCancel, initialValues }) {
  const [type, setType] = useState('');
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    if (initialValues) {
      setType(initialValues.type || '');
      setFormValues(initialValues);
    } else {
      setType('');
      setFormValues({});
    }
  }, [initialValues]);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newStrategy = {
      ...formValues,
      id: initialValues?.id || Date.now(),
      type,
    };

    onSave(newStrategy);
  };

  // Fields based on type
  const commonFields = strategyFieldSchema.common;
  const typeSpecificFields = type ? strategyFieldSchema[type] || [] : [];

  // Special: exitStrategy and its conditional fields
  const exitStrategyValue = formValues.exitStrategy || '';
  let conditionalFields = [];

  const exitField = typeSpecificFields.find(f => f.name === 'exitStrategy');
  if (exitField?.conditionalFields && exitField.conditionalFields[exitStrategyValue]) {
    conditionalFields = exitField.conditionalFields[exitStrategyValue];
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8 border border-gray-200 overflow-y-auto">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-2">
        {initialValues ? 'Edit Strategy' : 'Create Strategy'}
      </h2>
      <p className="text-center text-gray-500 mb-4">
        Fill in the details below to {initialValues ? 'edit' : 'add'} your strategy.
      </p>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Type Selector */}
        <div>
          <label className="block mb-2 text-lg font-medium text-gray-700">
            Type <span className="text-red-500">*</span>
          </label>
          <select
            name="type"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              setFormValues((prev) => ({
                ...prev,
                type: e.target.value,
                exitStrategy: '', // reset exitStrategy on type change
              }));
            }}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
            disabled={!!initialValues}  // prevent changing Type during edit
          >
            <option value="">Select Strategy Type</option>
            {strategyTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <hr className="border-gray-300" />

        {/* Common Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {commonFields.map((field) => (
            <div key={field.name}>
              <label className="block mb-2 text-lg font-medium text-gray-700">
                {field.label} <span className="text-red-500">*</span>
              </label>
              <input
                type={field.type}
                name={field.name}
                value={formValues[field.name] || ''}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          ))}
        </div>

        {/* Type Specific Fields */}
        {type && typeSpecificFields.length > 0 && (
          <>
            <hr className="border-gray-300" />
            <h3 className="text-2xl font-semibold text-indigo-600 mt-4 mb-2">
              {type} Specific Fields
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {typeSpecificFields.map((field) => (
                <div key={field.name}>
                  <label className="block mb-2 text-lg font-medium text-gray-700">
                    {field.label} <span className="text-red-500">*</span>
                  </label>
                  {field.type === 'dropdown' ? (
                    <select
                      name={field.name}
                      value={formValues[field.name] || ''}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    >
                      <option value="">Select</option>
                      {field.options.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={formValues[field.name] || ''}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Conditional Fields based on Exit Strategy */}
        {conditionalFields.length > 0 && (
          <>
            <hr className="border-gray-300" />
            <h4 className="text-xl font-semibold text-indigo-600 mt-4 mb-2">
              Exit Strategy Configuration
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {conditionalFields.map((field) => (
                <div key={field.name}>
                  <label className="block mb-2 text-lg font-medium text-gray-700">
                    {field.label} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formValues[field.name] || ''}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              ))}
            </div>
          </>
        )}

        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            {initialValues ? 'Update Strategy' : 'Save Strategy'}
          </button>
        </div>
      </form>
    </div>
  );
}
