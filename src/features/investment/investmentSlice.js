import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/api';

// --- Async Thunk for fetching companies ---
export const fetchCompanies = createAsyncThunk(
  'investment/fetchCompanies',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("/api/companies");
      return response.data || [];
    } catch (err) {
      console.error("Error fetching companies:", err);
      // Ensure message is always a string for easy consumption in error UI
      return rejectWithValue(
        err.response?.data?.message ||
        err.message ||
        'Failed to fetch companies.'
      );
    }
  }
);

const initialState = {
  companies: [],
  isModalOpen: false,
  selectedCompany: null,
  actionType: "BUY",
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const investmentSlice = createSlice({
  name: 'investment',
  initialState,
  reducers: {
    openModal: (state, action) => {
      const { actionType, company } = action.payload;
      state.actionType = actionType;
      state.selectedCompany = company;
      state.isModalOpen = true;
      state.error = null;       // clear errors on open (optional: UX tidy)
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.selectedCompany = null;
      state.error = null;       // clear errors on close
      state.status = 'idle';    // reset status for nice re-use (optional)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.companies = action.payload;
        state.error = null;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Error fetching companies';
      });
  },
});

export const { openModal, closeModal } = investmentSlice.actions;
export default investmentSlice.reducer;
