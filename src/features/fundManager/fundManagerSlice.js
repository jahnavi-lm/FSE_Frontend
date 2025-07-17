import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  fetchSchemesByManager, 
  fetchStrategyCount, 
  fetchBacktestCount 
} from '../../api/fundManagerApi';

// Async thunk for fetching the fund manager's schemes
export const getSchemes = createAsyncThunk(
  'fundManager/getSchemes',
  async (managerId, { rejectWithValue }) => {
    try {
      const schemes = await fetchSchemesByManager(managerId);
      return schemes;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching dashboard statistics
export const getDashboardStats = createAsyncThunk(
  'fundManager/getDashboardStats',
  async (_, { rejectWithValue }) => {
    try {
      const [strategies, backtest] = await Promise.all([
        fetchStrategyCount(),
        fetchBacktestCount(),
      ]);
      // NOTE: capital and pnl should be fetched from an API in a real app
      return { strategies: strategies ?? 0, backtest: backtest ?? 0, capital: 500000, pnl: 75000 };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  schemes: [],
  selectedScheme: '',
  managerData: {
    capital: '-',
    pnl: '-',
    strategies: '-',
    backtest: '-',
  },
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const fundManagerSlice = createSlice({
  name: 'fundManager',
  initialState,
  reducers: {
    setSelectedScheme: (state, action) => {
      state.selectedScheme = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Reducers for fetching schemes
      .addCase(getSchemes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSchemes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.schemes = action.payload || [];
        if (state.schemes.length > 0 && !state.selectedScheme) {
          state.selectedScheme = state.schemes[0].id;
        }
      })
      .addCase(getSchemes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Reducers for fetching stats
      .addCase(getDashboardStats.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getDashboardStats.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.managerData = action.payload;
      })
      .addCase(getDashboardStats.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setSelectedScheme } = fundManagerSlice.actions;

export default fundManagerSlice.reducer;