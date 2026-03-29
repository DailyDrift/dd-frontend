import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import gardenBg from "../assets/garden.jpg";

export default function QuotePage() {
    let navigate = useNavigate();
    const { isAuthenticated, username, logout } = useAuth();
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");

    useEffect(() => {
        fetch("http://localhost:3000/v1/quotes/quoteOfTheDay")
            .then((res) => res.json())
            .then((data) => {
                setQuote("\""+ data.quote + "\"");
                setAuthor("~" + data.author);
            })
            .catch(() => {
                setQuote("quote could not be loaded.");
                setAuthor("");
            });
    }, []);

    return (
        <div style={styles.page}>
            <style>{`
                @keyframes blurFadeIn {
                    from {
                        opacity: 0;
                        filter: blur(12px);
                    }
                    to {
                        opacity: 1;
                        filter: blur(0px);
                    }
                }
                .blur-fade-in {
                    animation: blurFadeIn 1s ease-out forwards;
                }
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
                <section style={styles.cardWho}>
                    {author && (
                        <span key={author} className="blur-fade-in">
                            {author}
                        </span>
                    )}
                </section>
                <section style={styles.cardQuote}>
                    {quote && (
                        <span key={quote} className="blur-fade-in" style={{ animationDelay: "0.2s", opacity: 0 }}>
                            {quote}
                        </span>
                    )}
                </section>
                <section style={styles.cardImage}></section>
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
    grid: {
        display: "grid",
        gridTemplateColumns: " 1.15fr 3fr",
        gridTemplateRows: "4fr 1fr",
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
    cardWho: {
        gridColumn: "2 / 2",
        gridRow: "2 / 2",
        borderRadius: "20px",
        border: "2px solid #000",
        padding: "16px",
        fontSize: "30px",
        fontWeight: "600",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    cardQuote: {
        gridColumn: "2 / 2",
        gridRow: "1 / 1",
        borderRadius: "20px",
        border: "2px solid #000",
        padding: "16px",
        fontSize: "30px",
        textAlign: "center",
        fontWeight: "600",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    cardImage: {
        gridColumn: "1 / 1",
        gridRow: "1 / 3",
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
};