import { useNavigate } from "react-router-dom";
import api from "../api/api.js";
import {useEffect} from "react";

export default function JournalingPage() {
    let navigate = useNavigate();

    return (
        <div style={styles.page}>
            <header style={styles.header}>
                <div style={styles.logo}>Daily Drift</div>
                <button style={styles.menuButton}
                        onClick={() => navigate("/")}
                >Home</button>
            </header>

            <main style={styles.grid}>
                <section style={styles.cardJournal}>Journaling is a simple yet incredibly powerful habit that can sustainably transform your life in profound ways. By taking just a few minutes each day to write down your thoughts, feelings, and daily experiences, you create remarkable clarity in your mind. Chaotic, racing thoughts that keep you up at night become structured and organized on the page. Worries that once felt overwhelming lose their grip as you externalize them, and most importantly, you develop the ability to spot negative thought patterns early—before they spiral into full-blown emotional traps or destructive cycles. Scientific studies, including research from the University of Rochester, demonstrate that regular journaling can reduce anxiety levels by up to 20%, largely because it acts as a mental pressure valve, systematically unloading cognitive burdens while simultaneously building genuine self-awareness and emotional intelligence.
                    <br /><br />
                    The benefits of this practice extend far beyond basic stress relief—they're truly diverse and life-changing. Journaling strengthens your emotional resilience by helping you meticulously track personal triggers alongside your successes, empowering you to respond to challenges with calm composure rather than impulsive reactions. Your loftiest goals shift from vague, distant dreams into tangible, actionable steps through consistent weekly reviews that hold you accountable. Research consistently shows that people who maintain a journaling habit achieve 42% more of their personal intentions and objectives compared to those who don't. Additionally, it delivers tangible improvements to sleep quality and overall mood: Evening entries serve as a powerful way to process the day's events and let go of lingering tension, while morning pages clear mental clutter and set clear, positive intentions that guide your entire day with purpose and focus.
                    <br /><br />
                    That's precisely why you should integrate Daily Drift into your daily routine without fail. Our intuitive web app makes it effortless to stay consistent with your journaling goals, providing smart tools to track your daily progress while delivering stunning, real-time visualizations of your stats and achievements through beautifully designed dashboards. At a glance, you'll see comprehensive insights into your water intake trends, detailed sleep patterns over time, evolving mood analytics, and your completed todos with completion streaks—all motivating you to celebrate every win, no matter how small. As you log entries and watch your personal growth metrics unfold day by day, you'll gain unprecedented momentum, maintain unbreakable motivation, and witness how consistent small actions compound into extraordinary long-term transformation.</section>
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
        gridTemplateColumns: " 1fr",
        gridTemplateRows: "1fr",
        gap: "20px",
        height: "calc(100vh - 120px)",
    },
    cardBase: {
        borderRadius: "20px",
        border: "4px solid #000",
        padding: "16px",
        fontSize: "22px",
        fontWeight: "500",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    cardJournal: {
        gridColumn: "1 / 1",
        gridRow: "1 / 1",
        borderRadius: "20px",
        border: "2px solid #000",
        padding: "26px",
        fontSize: "16px",
        fontWeight: "400",
        display: "flex",
        justifyContent: "center",

    },
};
