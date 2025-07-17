import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { saveStrategy } from '../../api/strategiesApi';
import toast from 'react-hot-toast';

const initialFormState = {
  strategyName: "",
  strategyScript: "",
  symbolList: [],
  startDate: "",
  endDate: "",
  initialCapital: 500000,
};

// --- Async Thunk for running the backtest ---
export const runBacktest = createAsyncThunk(
  'backtest/run',
  async (form, { rejectWithValue }) => {
    try {
      const [backtestResponse, candleResponse] = await Promise.all([
        axios.post("http://localhost:8080/api/backtest", form),
        axios.post("http://localhost:8080/api/backtest/candles", form),
      ]);

      return {
        result: backtestResponse.data,
        candles: candleResponse.data
      };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Backtest failed');
    }
  }
);

// --- Async Thunk for saving the strategy ---
export const saveBacktestStrategy = createAsyncThunk(
  'backtest/saveStrategy',
  async (form, { rejectWithValue }) => {
    if (!form.strategyName || !form.strategyScript || form.symbolList.length === 0) {
      return rejectWithValue("Please fill in all required fields.");
    }
    try {
      const payload = { ...form, status: "NOT_STARTED" };
      const response = await saveStrategy(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to save strategy.');
    }
  }
);


const initialState = {
  form: initialFormState,
  dropdownVisible: false,
  selectedIndex: null,
  result: null,
  candleSeries: [],
  companyCandleMap: {},
  selectedCompanyForChart: "",
  status: 'idle',
  error: null,
};

const backtestSlice = createSlice({
  name: 'backtest',
  initialState,
  reducers: {
    updateFormField: (state, action) => {
      const { name, value } = action.payload;
      state.form[name] = value;
    },
    updateScript: (state, action) => {
      state.form.strategyScript = action.payload;
    },
    toggleDropdown: (state) => {
      state.dropdownVisible = !state.dropdownVisible;
    },
    closeDropdown: (state) => {
      state.dropdownVisible = false;
    },
    toggleSymbolSelection: (state, action) => {
      const symbol = action.payload;
      if (state.form.symbolList.includes(symbol)) {
        state.form.symbolList = state.form.symbolList.filter((s) => s !== symbol);
        if (state.selectedIndex === symbol) {
          state.selectedIndex = null;
        }
      } else {
        const INDICES = ["NIFTY 50", "NIFTY NEXT 50"];
        if (INDICES.includes(symbol)) {
          state.form.symbolList = [symbol];
          state.selectedIndex = symbol;
        } else if (!state.selectedIndex) {
          state.form.symbolList.push(symbol);
        }
      }
    },
    removeSymbol: (state, action) => {
      const symbol = action.payload;
      state.form.symbolList = state.form.symbolList.filter((s) => s !== symbol);
      const INDICES = ["NIFTY 50", "NIFTY NEXT 50"];
      if (INDICES.includes(symbol)) {
        state.selectedIndex = null;
      }
    },
    setSelectedCompanyForChart: (state, action) => {
      state.selectedCompanyForChart = action.payload;
      state.candleSeries = state.companyCandleMap[action.payload] || [];
    },
    resetBacktest: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // --- Handlers for runBacktest ---
      .addCase(runBacktest.pending, (state) => {
        state.status = 'loading';
        // Use a unique ID and set duration to Infinity
        toast.loading("Running backtest...", { id: 'runBacktestToast', duration: Infinity });
      })
      .addCase(runBacktest.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.result = action.payload.result;

        const symbolWiseMap = {};
        for (const [symbol, candles] of Object.entries(action.payload.candles)) {
          const formatted = candles.map((d) => ({ x: new Date(d.x).getTime(), y: d.y }));
          symbolWiseMap[symbol] = [{ data: formatted }];
        }
        state.companyCandleMap = symbolWiseMap;
        const firstSymbol = Object.keys(symbolWiseMap)[0];
        if (firstSymbol) {
          state.selectedCompanyForChart = firstSymbol;
          state.candleSeries = symbolWiseMap[firstSymbol];
        }

        // Update the toast to success, which will auto-dismiss after 4 seconds
        toast.success("Backtest completed!", { id: 'runBacktestToast', duration: 4000 });
      })
      .addCase(runBacktest.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        // Update the toast to an error message, which will auto-dismiss
        toast.error(action.payload, { id: 'runBacktestToast', duration: 4000 });
      })

      // --- Handlers for saveBacktestStrategy ---
      .addCase(saveBacktestStrategy.pending, (state) => {
        toast.loading("Saving strategy...", { id: 'saveStrategyToast', duration: Infinity });
      })
      .addCase(saveBacktestStrategy.fulfilled, (state, action) => {
        toast.success("Strategy saved successfully!", { id: 'saveStrategyToast', duration: 4000 });
      })
      .addCase(saveBacktestStrategy.rejected, (state, action) => {
        toast.error(action.payload, { id: 'saveStrategyToast', duration: 4000 });
      });
  },
});

export const {
  updateFormField,
  toggleDropdown,
  closeDropdown,
  toggleSymbolSelection,
  removeSymbol,
  updateScript,
  setSelectedCompanyForChart,
  resetBacktest,
} = backtestSlice.actions;

export default backtestSlice.reducer;