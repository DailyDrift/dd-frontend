import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import {
    getWaterAnalytics,
    getSleepAnalytics,
    getTodosAnalytics,
    getMoodAnalytics,
} from "../api/AnalyticsApi";

function getMoodLabel(avg) {
    if (avg == null) return { label: "—", color: "#999" };
    if (avg < 0.4)  return { label: "Very Bad", color: "#b91c1c" };
    if (avg < 0.8)  return { label: "Bad",      color: "#ef4444" };
    if (avg < 1.2)  return { label: "Okay",      color: "#f59e0b" };
    if (avg < 1.6)  return { label: "Good",      color: "#84cc16" };
    return { label: "Very Good", color: "#16a34a" };
}

function useCountUp(target, duration = 1200) {
    const [display, setDisplay] = useState(null);
    const rafRef = useRef(null);

    useEffect(() => {
        if (target == null) return;

        const isFloat = !Number.isInteger(target);
        const start = performance.now();

        function tick(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * target;
            setDisplay(isFloat ? current.toFixed(1) : Math.round(current));
            if (progress < 1) rafRef.current = requestAnimationFrame(tick);
        }

        rafRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafRef.current);
    }, [target, duration]);

    return display;
}

export default function Stat1Page() {
    const navigate = useNavigate();
    const { isAuthenticated, username, logout } = useAuth();

    const [water, setWater] = useState(null);
    const [sleep, setSleep] = useState(null);
    const [todos, setTodos] = useState(null);
    const [mood, setMood] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cardsVisible, setCardsVisible] = useState(false);

    useEffect(() => {
        async function fetchAll() {
            try {
                const [waterData, sleepData, todosData, moodData] = await Promise.all([
                    getWaterAnalytics(),
                    getSleepAnalytics(),
                    getTodosAnalytics(),
                    getMoodAnalytics(),
                ]);
                setWater(waterData);
                setSleep(sleepData);
                setTodos(todosData);
                setMood(moodData);
            } catch (err) {
                setError("Daten konnten nicht geladen werden.");
            } finally {
                setLoading(false);
            }
        }
        fetchAll();

        const timer = setTimeout(() => setCardsVisible(true), 50);
        return () => clearTimeout(timer);
    }, []);

    const waterCount = useCountUp(loading ? null : (water?.avgWaterPerDay ?? null));
    const sleepCount  = useCountUp(loading ? null : (sleep?.avgSleepPerDay  ?? null));
    const todosCount  = useCountUp(loading ? null : (todos?.completedTodos  ?? null));

    const moodLabel = getMoodLabel(mood?.avgMood ?? null);

    const cardFadeStyle = (index) => ({
        opacity: cardsVisible ? 1 : 0,
        transform: cardsVisible ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 0.5s ease ${index * 80}ms, transform 0.5s ease ${index * 80}ms`,
    });

    return (
        <div style={styles.page}>
            <header style={styles.header}>
                <div style={styles.logo} onClick={() => navigate("/")}>Daily Drift</div>

                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    {isAuthenticated && username && (
                        <>
                            <span style={styles.userInfo}>
                                Currently logged in as: <strong>{username}</strong>
                            </span>
                            <button style={styles.menuButton} onClick={() => { logout(); navigate("/"); }}>
                                Logout
                            </button>
                        </>
                    )}
                    <button style={styles.menuButton} onClick={() => navigate("/")}>Home</button>
                </div>
            </header>

            {error && <div style={styles.errorBanner}>{error}</div>}

            <main style={styles.grid}>

                {/* water consumption */}
                <section style={{ ...styles.cardWater, ...cardFadeStyle(0) }}>
                    <span style={styles.cardTitle}>Water Consumption</span>
                    <span style={styles.cardValue}>
                        {loading ? "…" : (waterCount ?? "—")}
                    </span>
                    <span style={styles.cardUnit}>liters / day (avg.)</span>
                </section>

                {/* more analysis*/}
                <div style={{ ...styles.cardAna2, ...cardFadeStyle(1) }} onClick={() => navigate("/more-analytics")}>
                    <span style={styles.cardTitleAna}>More Analytics</span>
                    <span style={styles.cardValueAna}>→</span>
                    <span style={styles.cardUnitAna}>Take a deeper look</span>
                </div>

                {/* todois */}
                <section style={{ ...styles.cardTodo, ...cardFadeStyle(2) }}>
                    <span style={styles.cardTitle}>Todos done</span>
                    <span style={styles.cardValue}>
                        {loading ? "…" : (todosCount ?? "—")}
                    </span>
                    <span style={styles.cardUnit}>this month</span>
                </section>

                {/* sleep */}
                <section style={{ ...styles.cardSleep, ...cardFadeStyle(3) }}>
                    <span style={styles.cardTitle}>Sleep per Day</span>
                    <span style={styles.cardValue}>
                        {loading ? "…" : (sleepCount ?? "—")}
                    </span>
                    <span style={styles.cardUnit}>hours avg.</span>
                </section>

                {/* mood */}
                <section style={{ ...styles.cardMood, ...cardFadeStyle(4) }}>
                    <span style={styles.cardTitle}>Your Mood</span>
                    <span style={{ ...styles.cardValueMood, color: loading ? "#ccc" : moodLabel.color }}>
                        {loading ? "…" : moodLabel.label}
                    </span>
                    <span style={styles.cardUnit}>this month</span>
                </section>

            </main>
        </div>
    );
}

const styles = {
    page: {
        minHeight: "100vh",
        padding: "16px",
        boxSizing: "border-box",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        background: "#fff",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 16px",
        borderRadius: "16px",
        border: "2px solid #000",
        marginBottom: "16px",
    },
    logo: {
        fontSize: "24px",
        fontWeight: "600",
        cursor: "pointer",
    },
    menuButton: {
        borderRadius: "16px",
        border: "2px solid #000",
        padding: "8px 16px",
        background: "white",
        cursor: "pointer",
        fontSize: "15px",
        fontWeight: "500",
    },
    userInfo: {
        fontSize: "14px",
        fontWeight: "400",
        color: "#333",
    },
    errorBanner: {
        background: "#fee2e2",
        border: "1px solid #fca5a5",
        borderRadius: "12px",
        padding: "10px 16px",
        marginBottom: "12px",
        color: "#b91c1c",
        fontSize: "14px",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1.2fr",
        gridTemplateRows: "1fr 1fr",
        gap: "16px",
        height: "calc(100vh - 120px)",
    },
    cardWater: {
        gridColumn: "1 / 3",
        gridRow: "1 / 2",
        borderRadius: "20px",
        border: "2px solid #000",
        padding: "20px 16px 14px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        overflow: "hidden",
    },
    cardAna2: {
        gridColumn: "3 / 4",
        gridRow: "1 / 2",
        borderRadius: "20px",
        border: "2px solid #000",
        padding: "20px 16px 14px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: "pointer",
        background: "#000",
        color: "#fff",
        overflow: "hidden",
    },
    cardTodo: {
        gridColumn: "4 / 5",
        gridRow: "1 / 3",
        borderRadius: "20px",
        border: "2px solid #000",
        padding: "20px 16px 14px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        overflow: "hidden",
    },
    cardSleep: {
        gridColumn: "1 / 2",
        gridRow: "2 / 3",
        borderRadius: "20px",
        border: "2px solid #000",
        padding: "20px 16px 14px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        overflow: "hidden",
    },
    cardMood: {
        gridColumn: "2 / 4",
        gridRow: "2 / 3",
        borderRadius: "20px",
        border: "2px solid #000",
        padding: "20px 16px 14px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        overflow: "hidden",
    },
    cardTitle: {
        fontSize: "18px",
        fontWeight: "600",
        textAlign: "center",
        letterSpacing: "0.01em",
        color: "#111",
        width: "100%",
    },
    cardTitleAna: {
        fontSize: "18px",
        fontWeight: "600",
        textAlign: "center",
        letterSpacing: "0.01em",
        color: "#fff",
        width: "100%",
    },
    cardValue: {
        fontSize: "clamp(56px, 8vw, 96px)",
        fontWeight: "300",
        lineHeight: "1",
        textAlign: "center",
        color: "#111",
        flex: "1",
        display: "flex",
        alignItems: "center",
    },
    cardValueAna: {
        fontSize: "clamp(56px, 6vw, 80px)",
        fontWeight: "300",
        lineHeight: "1",
        textAlign: "center",
        color: "#fff",
        flex: "1",
        display: "flex",
        alignItems: "center",
    },
    cardValueMood: {
        fontSize: "clamp(28px, 4.5vw, 56px)",
        fontWeight: "600",
        lineHeight: "1",
        textAlign: "center",
        flex: "1",
        display: "flex",
        alignItems: "center",
        letterSpacing: "-0.01em",
    },
    cardUnit: {
        fontSize: "13px",
        fontWeight: "400",
        color: "#666",
        textAlign: "center",
        letterSpacing: "0.04em",
        textTransform: "uppercase",
    },
    cardUnitAna: {
        fontSize: "13px",
        fontWeight: "400",
        color: "#aaa",
        textAlign: "center",
        letterSpacing: "0.04em",
        textTransform: "uppercase",
    },
};