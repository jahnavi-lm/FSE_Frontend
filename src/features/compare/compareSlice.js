import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllStrategies, getBacktestResult } from '../../api/strategiesApi';

// Async thunks
export const fetchCompletedStrategies = createAsyncThunk(
  'compare/fetchCompleted',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllStrategies();
      const completed = (res.data || []).filter((s) => s.status === 'completed');
      return completed;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchStrategyDetails = createAsyncThunk(
  'compare/fetchDetails',
  async ({ strategyId, strategyNum }, { rejectWithValue, getState }) => {
    try {
      const { allStrategies } = getState().compare;
      const summaryData = allStrategies.find((s) => s.id === strategyId);
      if (!summaryData) return null;

      const res = await getBacktestResult(strategyId);
      const resultData = res.data;
      const pnl = ((resultData.finalEquity || 0) - (resultData.initialEquity || 0)).toFixed(2);
      
      return {
        strategyNum,
        data: {
          id: strategyId,
          name: summaryData.strategyName,
          result: {
            initialEquity: resultData.initialEquity,
            finalEquity: resultData.finalEquity,
            pnl: `₹${pnl}`,
          },
          full: {
            trades: resultData.trades || [],
          },
        },
      };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  allStrategies: [],
  status: 'idle',
  selected1: null,
  selected2: null,
  strategy1: null,
  strategy2: null,
  lineMetric: 'BUY',
  error: null,
};

const compareSlice = createSlice({
  name: 'compare',
  initialState,
  reducers: {
    selectStrategy1: (state, action) => {
      state.selected1 = action.payload;
      if (!action.payload) state.strategy1 = null;
    },
    selectStrategy2: (state, action) => {
      state.selected2 = action.payload;
      if (!action.payload) state.strategy2 = null;
    },
    setLineMetric: (state, action) => {
      state.lineMetric = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompletedStrategies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCompletedStrategies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allStrategies = action.payload;
      })
      .addCase(fetchCompletedStrategies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchStrategyDetails.fulfilled, (state, action) => {
        if (action.payload) {
          if (action.payload.strategyNum === 1) {
            state.strategy1 = action.payload.data;
          } else {
            state.strategy2 = action.payload.data;
          }
        }
      });
  },
});

export const { selectStrategy1, selectStrategy2, setLineMetric } = compareSlice.actions;

export default compareSlice.reducer;