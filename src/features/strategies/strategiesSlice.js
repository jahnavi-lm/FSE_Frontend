import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import {
  getAllStrategies,
  saveStrategy,
  deleteStrategy,
  startSimulation,
  stopSimulation,
  getBacktestResult,
} from '../../api/strategiesApi';

// Async thunks for interacting with the API
export const fetchStrategies = createAsyncThunk('strategies/fetchAll', async () => {
  const response = await getAllStrategies();
  return response.data;
});

export const addStrategy = createAsyncThunk('strategies/add', async (strategy) => {
  const response = await saveStrategy(strategy);
  return response.data;
});

export const removeStrategy = createAsyncThunk('strategies/delete', async (id) => {
  await deleteStrategy(id);
  return id;
});

export const runSimulation = createAsyncThunk('strategies/startSim', async (id, { rejectWithValue }) => {
  try {
    const response = await startSimulation(id);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Simulation failed');
  }
});

export const stopCurrentSimulation = createAsyncThunk('strategies/stopSim', async (id) => {
  const response = await stopSimulation(id);
  return response.data;
});

export const fetchResult = createAsyncThunk('strategies/fetchResult', async (id) => {
  const response = await getBacktestResult(id);
  return response.data;
});

const initialState = {
  strategies: [],
  status: 'idle',
  error: null,
  showForm: false,
  editingStrategy: null,
  showResult: null,
  runningSimulations: {},
};

const strategiesSlice = createSlice({
  name: 'strategies',
  initialState,
  reducers: {
    openForm: (state, action) => {
      state.editingStrategy = action.payload || null;
      state.showForm = true;
    },
    closeForm: (state) => {
      state.showForm = false;
      state.editingStrategy = null;
    },
    openResult: (state, action) => {
      state.showResult = action.payload;
    },
    closeResult: (state) => {
      state.showResult = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStrategies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStrategies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.strategies = action.payload;
      })
      .addCase(fetchStrategies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addStrategy.fulfilled, (state, action) => {
        // No need to push, fetchStrategies will be called to get the latest list
      })
      .addCase(removeStrategy.fulfilled, (state, action) => {
        state.strategies = state.strategies.filter((s) => s.id !== action.payload);
      })
      .addCase(runSimulation.pending, (state, action) => {
        const id = action.meta.arg;
        state.runningSimulations[id] = true;
        toast.loading("Running simulation...", { id: `sim-${id}`, duration: Infinity });
      })
      .addCase(runSimulation.fulfilled, (state, action) => {
        const id = action.meta.arg;
        const index = state.strategies.findIndex((s) => s.id === id);
        if (index !== -1) {
          state.strategies[index] = action.payload;
        }
        delete state.runningSimulations[id];
        toast.success("Simulation completed!", { id: `sim-${id}`, duration: 4000 });
      })
      .addCase(runSimulation.rejected, (state, action) => {
        const id = action.meta.arg;
        delete state.runningSimulations[id];
        toast.error(action.payload, { id: `sim-${id}`, duration: 4000 });
      })
      .addCase(fetchResult.fulfilled, (state, action) => {
        state.showResult = action.payload;
      });
  },
});

export const { openForm, closeForm, openResult, closeResult } = strategiesSlice.actions;

export default strategiesSlice.reducer;