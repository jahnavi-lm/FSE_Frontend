import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllStrategies } from '../../api/strategiesApi';
import { mockFunds } from '../../../Data/BacktestData';
import { initialStrategies } from '../../../Data/strategiesData'; // Corrected import path

// This async thunk will fetch all strategies and transform them into the "results" format
export const fetchResults = createAsyncThunk(
  'results/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllStrategies();
      const completedStrategies = (response.data || []).filter(
        (s) => s.status === 'completed'
      );

      // Transform the strategies into the result format
      const results = completedStrategies.map(strategy => {
        const pnl = (strategy.result?.finalEquity || 0) - (strategy.result?.initialEquity || 0);
        const fund = mockFunds.find(f => f.id === strategy.fundId) || { name: 'Unknown Fund' };
        const strat = initialStrategies.find(s => s.id === strategy.id) || { name: 'Unknown Strategy' };

        return {
          id: strategy.id,
          stockSymbol: strategy.symbolList.join(', '),
          fund: fund.name,
          strategyId: strat.name,
          simulatedPnL: pnl,
          status: strategy.status,
          trades: strategy.result?.trades || [],
        };
      });

      return results;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

const initialState = {
  results: [],
  selected: null,
  status: 'idle',
  error: null,
};

const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    setSelectedResult: (state, action) => {
      state.selected = action.payload;
    },
    clearSelectedResult: (state) => {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResults.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchResults.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.results = action.payload;
      })
      .addCase(fetchResults.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setSelectedResult, clearSelectedResult } = resultsSlice.actions;

export default resultsSlice.reducer;