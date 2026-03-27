import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import gardenBg from "../assets/garden.jpg";

export default function HomePage() {
    let navigate = useNavigate();
    const [journalHovered, setJournalHovered] = useState(false);
    const [quoteHovered, setQuoteHovered] = useState(false);
    const [aboutHovered, setAboutHovered] = useState(false);
    const { isAuthenticated } = useAuth();

    const [analyticsHovered, setAnalyticsHovered] = useState(false);

    return (
        <div style={styles.page}>
            <header style={styles.header}>
                <div style={styles.logo}>Daily Drift</div>
                <button style={styles.menuButton}
                        onClick={() => navigate("/about-us")}
                >About Us</button>
            </header>

            <main style={styles.grid}>
                <section
                    style={styles.cardJournal}
                    onClick={() => navigate(isAuthenticated ? "/journal" : "/login")}
                    onMouseEnter={() => setJournalHovered(true)}
                    onMouseLeave={() => setJournalHovered(false)}
                >
                    <span style={{
                        ...styles.cardLabel,
                        opacity: journalHovered ? 0 : 1,
                        filter: journalHovered ? "blur(6px)" : "blur(0px)",
                    }}>
                        Your Journal
                    </span>
                    <span style={{
                        ...styles.cardLabel,
                        color: "red",
                        position: "absolute",
                        opacity: journalHovered ? 1 : 0,
                        filter: journalHovered ? "blur(0px)" : "blur(6px)",
                    }}>
                        あなたの日記
                    </span>
                </section>

                <section
                    style={styles.cardQuote}
                    onClick={() => navigate("/quote")}
                    onMouseEnter={() => setQuoteHovered(true)}
                    onMouseLeave={() => setQuoteHovered(false)}
                >
                    <span style={{
                        ...styles.cardLabel,
                        opacity: quoteHovered ? 0 : 1,
                        filter: quoteHovered ? "blur(6px)" : "blur(0px)",
                    }}>
                        Quote of the Day
                    </span>
                    <span style={{
                        ...styles.cardLabel,
                        color: "red",
                        position: "absolute",
                        opacity: quoteHovered ? 1 : 0,
                        filter: quoteHovered ? "blur(0px)" : "blur(6px)",
                    }}>
                        今日の名言
                    </span>
                </section>

                <section style={styles.cardImage}></section>

                <section
                    style={styles.cardAboutJournaling}
                    onClick={() => navigate("/about-Journaling")}
                    onMouseEnter={() => setAboutHovered(true)}
                    onMouseLeave={() => setAboutHovered(false)}
                >
                    <span style={{
                        ...styles.cardLabel,
                        opacity: aboutHovered ? 0 : 1,
                        filter: aboutHovered ? "blur(6px)" : "blur(0px)",
                    }}>
                        About Journaling
                    </span>
                    <span style={{
                        ...styles.cardLabel,
                        color: "red",
                        position: "absolute",
                        opacity: aboutHovered ? 1 : 0,
                        filter: aboutHovered ? "blur(0px)" : "blur(6px)",
                    }}>
                        ジャーナリングについて
                    </span>
                </section>

                <section
                    style={styles.cardAnalytics}
                    onClick={() => navigate("/analytics")}
                    onMouseEnter={() => setAnalyticsHovered(true)}
                    onMouseLeave={() => setAnalyticsHovered(false)}
                >
                    <span style={{
                        ...styles.cardLabel,
                        opacity: analyticsHovered ? 0 : 1,
                        filter: analyticsHovered ? "blur(6px)" : "blur(0px)",
                    }}>
                        Analytics
                    </span>
                    <span style={{
                        ...styles.cardLabel,
                        color: "red",
                        position: "absolute",
                        opacity: analyticsHovered ? 1 : 0,
                        filter: analyticsHovered ? "blur(0px)" : "blur(6px)",
                    }}>
                        分析
                    </span>
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
        padding: "12px 12px",
        borderRadius: "16px",
        border: "2px solid #000",
        marginBottom: "16px",
    },
    logo: {
        fontSize: "24px",
        fontWeight: "600",
    },
    menuButton: {
        borderRadius: "16px",
        border: "2px solid #000",
        padding: "8px 16px",
        background: "white",
        cursor: "pointer",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1.2fr",
        gridTemplateRows: "1fr 1fr",
        gap: "20px",
        height: "calc(100vh - 120px)",
        cursor: "pointer",
    },
    cardLabel: {
        transition: "opacity 2.5s ease, filter 1.2s ease",
        fontSize: "30px",
        fontWeight: "600",
    },
    cardJournal: {
        gridColumn: "1 / 3",
        gridRow: "1 / 2",
        borderRadius: "20px",
        border: "2px solid #000",
        padding: "16px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
    },
    cardQuote: {
        gridColumn: "3 / 4",
        gridRow: "1 / 2",
        borderRadius: "20px",
        border: "2px solid #000",
        padding: "16px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
    },
    cardImage: {
        gridColumn: "4 / 4",
        gridRow: "1 / 4",
        borderRadius: "20px",
        border: "2px solid #000",
        padding: "16px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        backgroundImage: `url(${gardenBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    },
    cardAboutJournaling: {
        gridColumn: "1 / 2",
        gridRow: "2 / 4",
        borderRadius: "20px",
        border: "2px solid #000",
        padding: "16px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
    },
    cardAnalytics: {
        gridColumn: "2 / 4",
        gridRow: "2 / 4",
        borderRadius: "20px",
        border: "2px solid #000",
        padding: "16px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
    },
};