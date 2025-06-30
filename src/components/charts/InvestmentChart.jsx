import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const mockData = {
  Week: [
    { date: "Mon", nav: 102 },
    { date: "Tue", nav: 104 },
    { date: "Wed", nav: 101 },
    { date: "Thu", nav: 105 },
    { date: "Fri", nav: 108 },
  ],
  Month: [
    { date: "Week 1", nav: 95 },
    { date: "Week 2", nav: 98 },
    { date: "Week 3", nav: 102 },
    { date: "Week 4", nav: 108 },
  ],
  Year: Array.from({ length: 12 }, (_, i) => ({
    date: `Month ${i + 1}`,
    nav: Math.floor(90 + Math.random() * 30),
  })),
};

export default function InvestmentChart() {
  const [range, setRange] = useState("Month");

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-700">📊 Investment Performance</h3>
        <div className="space-x-2">
          {["Week", "Month", "Year"].map((label) => (
            <button
              key={label}
              onClick={() => setRange(label)}
              className={`px-3 py-1 rounded-full text-sm font-medium border ${
                range === label
                  ? "bg-teal-600 text-white border-teal-600"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={mockData[range]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip
            formatter={(value) => [`₹${value}`, "NAV"]}
            labelStyle={{ color: "#4B5563" }}
          />
          <Line
            type="monotone"
            dataKey="nav"
            stroke="#14b8a6"
            strokeWidth={2}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
