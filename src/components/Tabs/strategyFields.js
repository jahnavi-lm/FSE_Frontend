export const strategyTypes = [
  'Volume Surge',
  'Day of the Week',
  'Threshold-Based Buy/Sell Strategy',
  'Moving Average Crossover Strategy',
  'RSI-Based Strategy',
  'Buy & Hold',
];

export const strategyFieldSchema = {
  common: [
    { name: 'strategyName', label: 'Strategy Name', type: 'text' },
    { name: 'capitalAllocation', label: 'Capital Allocation (%)', type: 'number' },
  ],

  'Volume Surge': [
    { name: 'lookbackPeriod', label: 'Lookback Period (N days)', type: 'number' },
    { name: 'surgeThreshold', label: 'Surge Threshold (%)', type: 'number' },
    { 
      name: 'exitStrategy',
      label: 'Exit Strategy',
      type: 'dropdown',
      options: ['Target Profit', 'Hold(for 3 days)', 'Stop Loss'],
      conditionalFields: {
        'Hold(for 3 days)': [
          { name: 'numberOfDays', label: 'Number of Days', type: 'number' }
        ],
        'Stop Loss': [
          { name: 'percent', label: 'Stop Loss Percent (%)', type: 'number' }
        ],
        'Target Profit': [
          { name: 'percent', label: 'Target Profit Percent (%)', type: 'number' }
        ]
      }
    }
  ],

  'Day of the Week': [
    { name: 'buyDay', label: 'Buy Day', type: 'dropdown', options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] },
    { name: 'sellDay', label: 'Sell Day', type: 'dropdown', options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] },
  ],

  'Threshold-Based Buy/Sell Strategy': [
    { name: 'buyThreshold', label: 'Buy Threshold (%)', type: 'number' },
    { name: 'sellThreshold', label: 'Sell Threshold (%)', type: 'number' },
  ],

  'Moving Average Crossover Strategy': [
    { name: 'longTermDays', label: 'Long Term Days', type: 'number' },
    { name: 'shortTermDays', label: 'Short Term Days', type: 'number' },
  ],

  'RSI-Based Strategy': [
    { name: 'rsiHigh', label: 'RSI High Value', type: 'number' },
    { name: 'rsiLow', label: 'RSI Low Value', type: 'number' },
  ],

  'Buy & Hold': [
    {
      name: 'holdingPeriod',
      label: 'Holding Period (in Days)',
      type: 'number',
    }
  ],
};
