import './App.css'
import "./components/inventorySearch/inventorySearch.css"
import "./components/lowstockalert/lowStockAlert.css"
import LowStockAlerts from './components/lowstockalert/LowStockAlerts';
import { InventoryList } from './components/pages/inventoryList';
import { Route, Routes } from 'react-router-dom';

import Layout from './common/Layout';
import ProfilePage from './components/profilePage/profilePage';
import NavInterface from './components/navInterface/navInterface';
import SignInPage from "./components/authentication/SignIn";
import SignUpPage from "./components/authentication/SignUp";
import { getUserInfo } from "./hooks/getUserInfo";
import ProtectedRoute from "./components/protectedRoutes/protectedRoute";
import OnboardingPage from "./components/pages/onboardingPage";
import { useOnboarding } from "./hooks/useOnboarding";



function App() {
  // State removed

  getUserInfo()
  useOnboarding()

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="login/*" element={<SignInPage />} />
        <Route path="signup/*" element={<SignUpPage />} />
        <Route path="/" element={<NavInterface />} />
        <Route path="/onboarding" element={<OnboardingPage />} />


        <Route path="/low-stock-alerts" element={
          <ProtectedRoute>
            <LowStockAlerts />
          </ProtectedRoute>
        } />
        <Route path="/inventory-search" element={
          <InventoryList />
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
      </Route>
    </Routes>

  );
};

export default App;
