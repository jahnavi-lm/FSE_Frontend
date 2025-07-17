import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import fundManagerReducer from '../features/fundManager/fundManagerSlice';
import overviewReducer from '../features/overview/overviewSlice';
import strategiesReducer from '../features/strategies/strategiesSlice';
import compareReducer from '../features/compare/compareSlice';
import resultsReducer from '../features/results/resultsSlice';
import candleDataReducer from '../features/candleData/candleDataSlice';
import backtestReducer from '../features/backtest/backtestSlice';
import investmentReducer from '../features/investment/investmentSlice'; // Import the new reducer

export const store = configureStore({
  reducer: {
    auth: authReducer,
    fundManager: fundManagerReducer,
    overview: overviewReducer,
    strategies: strategiesReducer,
    compare: compareReducer,
    results: resultsReducer,
    candleData: candleDataReducer,
    backtest: backtestReducer,
    investment: investmentReducer, // Add the new reducer
  },
});