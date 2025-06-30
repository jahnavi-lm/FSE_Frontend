import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

const mockData = [
  { date: "Apr", nav: 57.4 },
  { date: "May", nav: 60.2 },
  { date: "Jun", nav: 61.3 },
];

function FundGraph() {
  return (
    <div className="bg-white shadow-xl rounded-2xl p-6">
      <h3 className="text-xl font-semibold text-indigo-700 mb-4">Past 3 Month Performance</h3>
      <LineChart width={500} height={250} data={mockData}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="nav" stroke="#6366f1" strokeWidth={2} />
      </LineChart>
    </div>
  );
}

export default FundGraph;