import { useState, useEffect } from 'react';
import { strategyTypes, strategyFieldSchema } from '../../../Data/strategyFields';

export default function StrategiesForm({ onSave, onCancel, initialValues }) {
  const [type, setType] = useState('');
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    if (initialValues) {
      setType(initialValues.type || '');
      let params = {};
      try {
        params = initialValues.parametersJson ? JSON.parse(initialValues.parametersJson) : {};
      } catch (e) {
        console.error('Invalid JSON in parametersJson:', e);
      }
      setFormValues({
        name: initialValues.name || '',
        capitalAllocation: initialValues.capitalAllocation || '',
        ...params,
      });
    }    
  }, [initialValues]);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, capitalAllocation, ...parameterFields } = formValues;

    const newStrategy = {
      ...(initialValues?.id ? { id: initialValues.id } : {}),
      name,
      type,
      capitalAllocation: parseFloat(capitalAllocation),
      parametersJson: JSON.stringify(parameterFields),
    };

    onSave(newStrategy);
  };

  const commonFields = strategyFieldSchema.common;
  const typeSpecificFields = type ? strategyFieldSchema[type] || [] : [];

  const exitStrategyValue = formValues.exitStrategy || '';
  let conditionalFields = [];

  const exitField = typeSpecificFields.find(f => f.name === 'exitStrategy');
  if (exitField?.conditionalFields && exitField.conditionalFields[exitStrategyValue]) {
    conditionalFields = exitField.conditionalFields[exitStrategyValue];
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6">
        <button
          onClick={onCancel}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>

        <h3 className="text-2xl font-bold text-teal-700 mb-4 text-center">
          {initialValues ? 'Edit Strategy' : 'Create New Strategy'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
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
                    exitStrategy: '',
                  }));
                }}
                required
                disabled={!!initialValues}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-teal-500 focus:outline-none"
              >
                <option value="">Select Strategy Type</option>
                {strategyTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {commonFields.map((field) => (
              <div key={field.name}>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  {field.label} <span className="text-red-500">*</span>
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formValues[field.name] || ''}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-teal-500 focus:outline-none"
                />
              </div>
            ))}
          </div>

          {type && typeSpecificFields.length > 0 && (
            <>
              <hr className="border-gray-200 my-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {typeSpecificFields.map((field) => (
                  <div key={field.name}>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      {field.label} <span className="text-red-500">*</span>
                    </label>
                    {field.type === 'dropdown' ? (
                      <select
                        name={field.name}
                        value={formValues[field.name] || ''}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-teal-500 focus:outline-none"
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
                        required
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-teal-500 focus:outline-none"
                      />
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {conditionalFields.length > 0 && (
            <>
              <hr className="border-gray-200 my-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {conditionalFields.map((field) => (
                  <div key={field.name}>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      {field.label} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={formValues[field.name] || ''}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 p-3 rounded-lg focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition"
            >
              {initialValues ? 'Update Strategy' : 'Save Strategy'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
