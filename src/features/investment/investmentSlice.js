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
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch companies.');
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
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.selectedCompany = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.companies = action.payload;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { openModal, closeModal } = investmentSlice.actions;

export default investmentSlice.reducer;