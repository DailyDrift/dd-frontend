// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import JournalingPage from "./pages/JournalingPage.jsx";
import DailysPage from "./pages/DailysPage.jsx";
import QuotePage from "./pages/QuoteOfTheDayPage.jsx";
import Stat1Page from "./pages/Statistics1Page.jsx";
// ggf. weitere Pages importieren

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            {/* weitere Routen später */}
            <Route path="*" element={<Navigate to="/" replace />} />

            <Route path="/journal" element={<DailysPage />} />
            <Route path="/quote" element={<QuotePage />} />
            <Route path="/about-journaling" element={<JournalingPage />} />
            <Route path="/analytics" element={<Stat1Page />} />

        </Routes>
    );
}
