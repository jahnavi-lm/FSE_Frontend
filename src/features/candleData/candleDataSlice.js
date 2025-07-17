import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCompaniesByIndex, importCandleData } from '../../api/candleImportApi';
import toast from 'react-hot-toast';

// Async thunk for fetching companies based on selected indices
export const fetchCompaniesForIndices = createAsyncThunk(
  'candleData/fetchCompanies',
  async (indices, { rejectWithValue }) => {
    if (indices.length === 0) return [];
    try {
      let allCompanies = [];
      for (const index of indices) {
        const data = await getCompaniesByIndex(index);
        allCompanies = [...allCompanies, ...data];
      }
      return [...new Set(allCompanies)];
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

// Async thunk for importing candle data for selected indices
export const importDataForIndices = createAsyncThunk(
  'candleData/importData',
  async (indices, { rejectWithValue }) => {
    if (indices.length === 0) {
      toast.error("Please select at least one index");
      return rejectWithValue("No indices selected");
    }
    try {
      for (const index of indices) {
        const importPromise = importCandleData(index);
        toast.promise(importPromise, {
          loading: `Importing ${index}...`,
          success: (message) => message,
          error: "Import failed. Please try again.",
        });
        await importPromise;
      }
      return "All selected data imported successfully!";
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

const initialState = {
  indices: ["NIFTY 50", "NIFTY NEXT 50", "NIFTY 100"],
  selectedIndices: [],
  dropdownOpen: false,
  companies: [],
  status: 'idle',
  error: null,
};

const candleDataSlice = createSlice({
  name: 'candleData',
  initialState,
  reducers: {
    toggleDropdown: (state) => {
      state.dropdownOpen = !state.dropdownOpen;
    },
    addIndex: (state, action) => {
      if (!state.selectedIndices.includes(action.payload)) {
        state.selectedIndices.push(action.payload);
      }
      state.dropdownOpen = false;
    },
    removeIndex: (state, action) => {
      state.selectedIndices = state.selectedIndices.filter(
        (index) => index !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompaniesForIndices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCompaniesForIndices.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.companies = action.payload;
      })
      .addCase(fetchCompaniesForIndices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(importDataForIndices.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { toggleDropdown, addIndex, removeIndex } = candleDataSlice.actions;

export default candleDataSlice.reducer;