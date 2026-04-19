import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Components */
import Header from "./components/Header";
import Footer from "./components/Footer";

/* Pages */
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

function App() {
  return (
    <BrowserRouter>
      
      {/* 🔥 Global Header */}
      <Header />

      {/* 🔥 Main Content Area */}
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
        </Routes>
      </div>

      {/* 🔥 Global Footer */}
      <Footer />

    </BrowserRouter>
  );
}

export default App;