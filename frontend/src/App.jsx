import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <BrowserRouter>
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
    
      </Routes>
    </BrowserRouter>
  );
}

export default App;