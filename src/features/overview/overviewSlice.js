import { createSlice } from '@reduxjs/toolkit';
import { fundManagerInvestments } from '../../../Data/OverviewData';

const chartData = {
  Week: [
    { date: "Mon", nav: 155 },
    { date: "Tue", nav: 88 },
    { date: "Wed", nav: 320 },
    { date: "Thu", nav: 107 },
    { date: "Fri", nav: 525 },
  ],
  Month: [
    { date: "Week 1", nav: 33 },
    { date: "Week 2", nav: 150 },
    { date: "Week 3", nav: 108 },
    { date: "Week 4", nav: 123 },
    { date: "Week 5", nav: 33 },
    { date: "Week 6", nav: 150 },
    { date: "Week 7", nav: 108 },
    { date: "Week 8", nav: 123 },
  ],
  Year: Array.from({ length: 12 }, (_, i) => ({
    date: `M${i + 1}`,
    nav: 90 + Math.floor(Math.random() * 30),
  })),
};

const investmentBreakdown = [
  { name: "Equity", value: 40 },
  { name: "Debt", value: 25 },
  { name: "Commodities", value: 15 },
  { name: "Real Estate", value: 10 },
  { name: "Cash", value: 10 },
];

const initialState = {
  chartRange: 'Month',
  chartData,
  investmentBreakdown,
  investments: fundManagerInvestments,
  pieColors: ["#14b8a6", "#3b82f6", "#f97316", "#a855f7", "#f43f5e"],
};

const overviewSlice = createSlice({
  name: 'overview',
  initialState,
  reducers: {
    setChartRange: (state, action) => {
      state.chartRange = action.payload;
    },
  },
});

export const { setChartRange } = overviewSlice.actions;

export default overviewSlice.reducer;