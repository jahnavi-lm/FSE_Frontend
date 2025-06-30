import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgotPassword from './components/Auth/ForgotPassword';
import Dashboard from './components/Dashboard/Dashboard';
import StrategyForm from './components/Tabs/StrategiesForm';
import Strategies from './components/Tabs/Strategies';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/add-strategy" element={<StrategyForm />} />
        <Route path="/dashboard/strategies" element={<Strategies />} />
      </Routes>
    </BrowserRouter>
  );
}
