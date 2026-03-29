import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import rockBg from "../assets/rock.jpg";
import pondBg from "../assets/pond.jpg";

export default function JournalingPage() {
    let navigate = useNavigate();
    const { isAuthenticated, username, logout } = useAuth();

    return (
        <div style={styles.page}>
            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        filter: blur(6px);
                        transform: translateY(12px);
                    }
                    to {
                        opacity: 1;
                        filter: blur(0px);
                        transform: translateY(0px);
                    }
                }
                @keyframes fadeInImage {
                    from {
                        opacity: 0;
                        filter: blur(8px);
                        transform: scale(0.95) translateY(8px);
                    }
                    to {
                        opacity: 1;
                        filter: blur(0px);
                        transform: scale(1) translateY(0px);
                    }
                }
                .para {
                    opacity: 0;
                    animation: fadeInUp 0.9s ease forwards;
                }
                .para:nth-of-type(1) { animation-delay: 0.2s; }
                .para:nth-of-type(2) { animation-delay: 0.4s; }
                .para:nth-of-type(3) { animation-delay: 0.6s; }
                .image-anim {
                    opacity: 0;
                    animation: fadeInImage 1.2s ease forwards;
                }
                .image-anim:nth-of-type(1) { animation-delay: 0.1s; }
                .image-anim:nth-of-type(2) { animation-delay: 0.5s; }
            `}</style>

            <header style={styles.header}>
                <div style={styles.logo}>Daily Drift</div>

                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    {isAuthenticated && username && (
                        <>
                            <span style={styles.userInfo}>
                                Currently logged in as: <strong>{username}</strong>
                            </span>
                            <button style={styles.menuButton} onClick={logout}>
                                Logout
                            </button>
                        </>
                    )}
                    <button style={styles.menuButton} onClick={() => navigate("/")}>
                        Home
                    </button>
                </div>
            </header>

            <main style={styles.grid}>
                <section style={styles.cardJournal}>
                    <section style={styles.grid2}>
                        <section className="image-anim" style={styles.cardImage}></section>

                        <p className="para" style={styles.paragraph}>
                            Journaling is a simple yet incredibly powerful habit that can sustainably
                            transform your life in profound ways. By taking just a few minutes each day
                            to write down your thoughts, feelings, and daily experiences, you create
                            remarkable clarity in your mind. Chaotic, racing thoughts that keep you up
                            at night become structured and organized on the page. Worries that once felt
                            overwhelming lose their grip as you externalize them, and most importantly,
                            you develop the ability to spot negative thought patterns early—before they
                            spiral into full-blown emotional traps or destructive cycles. Scientific
                            studies, including research from the University of Rochester, demonstrate
                            that regular journaling can reduce anxiety levels by up to 20%, largely
                            because it acts as a mental pressure valve, systematically unloading
                            cognitive burdens while simultaneously building genuine self-awareness and
                            emotional intelligence.
                        </p>

                        <p className="para" style={styles.paragraph2}>
                            The benefits of this practice extend far beyond basic stress relief—they're
                            truly diverse and life-changing. Journaling strengthens your emotional
                            resilience by helping you meticulously track personal triggers alongside
                            your successes, empowering you to respond to challenges with calm composure
                            rather than impulsive reactions. Your loftiest goals shift from vague,
                            distant dreams into tangible, actionable steps through consistent weekly
                            reviews that hold you accountable. Research consistently shows that people
                            who maintain a journaling habit achieve 42% more of their personal
                            intentions and objectives compared to those who don't. Additionally, it
                            delivers tangible improvements to sleep quality and overall mood: Evening
                            entries serve as a powerful way to process the day's events and let go of
                            lingering tension, while morning pages clear mental clutter and set clear,
                            positive intentions that guide your entire day with purpose and focus.
                        </p>

                        <section className="image-anim" style={styles.cardImage2}></section>

                        <p className="para" style={styles.paragraph3}>
                            That's precisely why you should integrate Daily Drift into your daily
                            routine without fail. Our intuitive web app makes it effortless to stay
                            consistent with your journaling goals, providing smart tools to track your
                            daily progress while delivering stunning, real-time visualizations of your
                            stats and achievements through beautifully designed dashboards. At a glance,
                            you'll see comprehensive insights into your water intake trends, detailed
                            sleep patterns over time, evolving mood analytics, and your completed todos
                            with completion streaks—all motivating you to celebrate every win, no matter
                            how small. As you log entries and watch your personal growth metrics unfold
                            day by day, you'll gain unprecedented momentum, maintain unbreakable
                            motivation, and witness how consistent small actions compound into
                            extraordinary long-term transformation.
                        </p>

                        <p style={styles.aiNote}>
                            ~ This text was generated by AI.
                        </p>
                    </section>
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
    userInfo: {
        fontSize: "14px",
        fontWeight: "400",
        color: "#333",
    },
    aiNote: {
        gridColumn: "1 / -1",
        fontSize: "0.75rem",
        color: "#888",
        marginTop: "8px",
        textAlign: "right",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "20px",
        minHeight: "calc(100vh - 120px)",
    },
    grid2: {
        display: "grid",
        gridTemplateColumns: "2fr 2.5fr 2fr",
        gap: "16px",
        width: "100%",
        alignItems: "start",
    },
    cardJournal: {
        borderRadius: "20px",
        border: "2px solid #000",
        padding: "26px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        overflowY: "auto",
    },
    paragraph: {
        fontSize: "16px",
        fontWeight: "400",
        lineHeight: "1.7",
        margin: 0,
        paddingLeft: "16px",
        paddingRight: "16px",
        gridColumn: "2 / -1",
    },
    paragraph2: {
        fontSize: "16px",
        fontWeight: "400",
        lineHeight: "1.7",
        margin: 0,
        gridColumn: "1 / -1",
    },
    paragraph3: {
        fontSize: "16px",
        fontWeight: "400",
        lineHeight: "1.7",
        margin: 0,
        gridColumn: "1 / 3",
        gridRow: "3",
    },
    cardImage: {
        gridColumn: "1 / 2",
        minHeight: "220px",
        borderRadius: "20px",
        border: "2px solid #000",
        overflow: "hidden",
        backgroundImage: `url(${rockBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    },
    cardImage2: {
        gridColumn: "3 / 4",
        minHeight: "220px",
        borderRadius: "20px",
        border: "2px solid #000",
        overflow: "hidden",
        backgroundImage: `url(${pondBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    },
};