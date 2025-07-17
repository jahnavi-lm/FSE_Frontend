import React from 'react';
import { FiX } from 'react-icons/fi';

// A helper component for consistent section styling
const DocsSection = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="text-xl font-bold text-gray-800 mb-2 border-b-2 border-teal-400 pb-1">{title}</h3>
    <div className="prose prose-sm max-w-none text-gray-600 space-y-2">
      {children}
    </div>
  </div>
);

// A helper component for styling inline code snippets
const Code = ({ children }) => (
  <code className="bg-gray-200 text-gray-800 font-mono rounded-md px-1.5 py-0.5 text-xs">
    {children}
  </code>
);

export default function StrategyDocsModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 hover:bg-gray-200 rounded-full p-1.5 transition-all"
          aria-label="Close"
        >
          <FiX size={20} />
        </button>

        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-600 mb-6 text-center">
          Trading Strategy Keyword Documentation
        </h2>
        <p className="text-center text-gray-500 mb-8 -mt-4">A guide to building your backtesting scripts.</p>

        <DocsSection title="Core Actions">
          <p>These are the primary commands that execute a trade.</p>
          <h4 className="font-semibold mt-4">BUY</h4>
          <p>Initiates a long position (a purchase) on an asset when the conditions following this keyword are met.</p>
          <pre className="bg-gray-100 p-3 rounded-lg mt-2 text-sm"><code>BUY WHEN SMA(10) {'>'} SMA(20)</code></pre>

          <h4 className="font-semibold mt-4">SELL</h4>
          <p>Initiates an action to close a long position (a sale). It executes when the subsequent conditions are true.</p>
          <pre className="bg-gray-100 p-3 rounded-lg mt-2 text-sm"><code>SELL WHEN RSI(14) {'>'} 70</code></pre>
        </DocsSection>

        <DocsSection title="Technical Indicators & Price Data">
          <p>These keywords represent calculations or data points derived from historical price data.</p>
          
          <div className="mt-4">
            <h4 className="font-semibold">SMA(n)</h4>
            <p><strong>Simple Moving Average</strong>. Calculates the average closing price over <Code>n</Code> periods. It's a trend-following indicator.</p>
            <p><strong>Example:</strong> <Code>BUY WHEN SMA(10) {'>'} SMA(20)</Code> signals potential upward momentum when the shorter-term average crosses above the longer-term average.</p>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold">RSI(n)</h4>
            <p><strong>Relative Strength Index</strong>. A momentum oscillator measuring the speed and change of price movements, ranging from 0 to 100.</p>
            <ul className="list-disc list-inside ml-4">
              <li><strong>Overbought:</strong> RSI {'>'} 70 suggests a potential price reversal downwards.</li>
              <li><strong>Oversold:</strong> RSI {'<'} 30 suggests a potential price bounce upwards.</li>
            </ul>
            <p><strong>Example:</strong> <Code>BUY WHEN ... RSI(14) {'<'} 30</Code></p>
          </div>
          
          <div className="mt-4">
            <h4 className="font-semibold">CLOSE</h4>
            <p>Refers to the closing price of the asset for the current time period.</p>
            <p><strong>Example:</strong> <Code>BUY WHEN ... CLOSE {'>'} 500</Code></p>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold">PERC_OPEN</h4>
            <p>The percentage change of the current period's opening price compared to the previous period's opening price. It measures the day-over-day gap.</p>
            <p><strong>Example:</strong> <Code>BUY WHEN PERC_OPEN {'>'} 1</Code> (Buy on a gap up of more than 1%).</p>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold">PERC_CLOSE</h4>
            <p>The percentage change of the current period's closing price compared to the previous period's closing price. This is the standard day-over-day percentage change.</p>
            <p><strong>Example:</strong> <Code>SELL WHEN ... PERC_CLOSE {'<'} -2</Code> (Sell if the price dropped more than 2% today).</p>
          </div>
        </DocsSection>

        <DocsSection title="Logical Operators">
          <p>Combine multiple conditions to create more complex and robust trading rules.</p>
          
          <div className="mt-4">
            <h4 className="font-semibold">AND</h4>
            <p>Requires <strong>all conditions</strong> to be true.</p>
            <p><strong>Example:</strong> <Code>SELL WHEN SMA(5) {'<'} SMA(10) AND PERC_CLOSE {'<'} -2</Code></p>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold">OR</h4>
            <p>Requires <strong>at least one condition</strong> to be true.</p>
            <p><strong>Example:</strong> <Code>SELL WHEN RSI(14) {'>'} 70 OR PERC_OPEN {'<'} -1</Code></p>
          </div>
        </DocsSection>

      </div>
    </div>
  );
}