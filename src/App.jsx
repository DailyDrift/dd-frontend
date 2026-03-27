import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import HomePage from "./pages/HomePage.jsx";
import JournalingPage from "./pages/JournalingPage.jsx";
import DailysPage from "./pages/DailysPage.jsx";
import QuotePage from "./pages/QuoteOfTheDayPage.jsx";
import Stat1Page from "./pages/Statistics1Page.jsx";
import AboutPage from "./pages/AboutUsPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import Stat2Page from "./pages/Statistics2Page.jsx";

export default function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/"                 element={<HomePage />} />
                <Route path="/journal"          element={<DailysPage />} />
                <Route path="/quote"            element={<QuotePage />} />
                <Route path="/about-journaling" element={<JournalingPage />} />
                <Route path="/analytics"        element={<Stat1Page />} />
                <Route path="/more-analytics"   element={<Stat2Page />} />
                <Route path="/about-us"         element={<AboutPage />} />
                <Route path="/login"            element={<LoginPage />} />
                <Route path="/register"         element={<RegisterPage />} />
                <Route path="*"                 element={<Navigate to="/" replace />} />
            </Routes>
        </AuthProvider>
    );
}