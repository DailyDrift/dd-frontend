import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import gardenBg from "../assets/garden.jpg";

export default function QuotePage() {
    let navigate = useNavigate();
    const [quote, setQuote] = useState("...");
    const [author, setAuthor] = useState("...");

    useEffect(() => {
        fetch("http://localhost:3000/v1/quotes/quoteOfTheDay")
            .then((res) => res.json())
            .then((data) => {
                setQuote(data.quote);
                setAuthor("~" + data.author);
            })
            .catch(() => {
                setQuote("quote could not be loaded.");
                setAuthor("");
            });
    }, []);

    return (
        <div style={styles.page}>
            <header style={styles.header}>
                <div style={styles.logo}>Daily Drift</div>
                <button style={styles.menuButton}
                        onClick={() => navigate("/")}
                >Home</button>
            </header>

            <main style={styles.grid}>
                <section style={styles.cardWho}>{author}</section>
                <section style={styles.cardQuote}>{quote}</section>
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
