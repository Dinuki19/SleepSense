import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import SleepPredictionPage from "./pages/SleepPredictionPage";
import SleepApneaPage from "./pages/SleepApnea";
import InsomniaPage from "./pages/Insomnia";
import HealthyPage from "./pages/Healthy";
import PredictionDetail from "./pages/PredictionDetail";
import HistoryPage from "./pages/HistoryPage";
import ProfilePage from "./pages/ProfilePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import AdminLogin from "./admin/pages/AdminLogin";
import AdminDashboard from "./admin/pages/AdminDashboard";
import Users from "./admin/pages/Users";
import Predictions from "./admin/pages/Predictions";

function App() {
  return (
    <BrowserRouter>
      
      
      <Header />

      
      <div className="main-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/predict" element={<SleepPredictionPage />} />
          <Route path="/insomnia" element={<InsomniaPage />} />
          <Route path="/sleep-apnea" element={<SleepApneaPage />} />
          <Route path="/healthy" element={<HealthyPage />} />
          <Route path="/prediction/:id" element={<PredictionDetail />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/predictions" element={<Predictions />} />
        </Routes>
      </div>

      
      <Footer />

    </BrowserRouter>
  );
}

export default App;