import { useNavigate } from "react-router-dom";

export default function DailysPage() {
    const navigate  = useNavigate();
    return (
        <div style={styles.page}>
            <header style={styles.header}>
                <div style={styles.logo}
                    onClick={() => navigate("/")}
                >Daily Drift</div>
                <button style={styles.menuButton}
                        onClick={() => navigate("/")}
                >Home</button>
            </header>

            <main style={styles.grid}>
                <section style={styles.cardJournal}></section>
                <section style={styles.cardQuote}></section>
                <section style={styles.cardImage}></section>
                <section style={styles.cardAboutJournaling}></section>
                <section style={styles.cardAnalytics}></section>
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
        cursor: "pointer",
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
        gridTemplateColumns: " 0.8fr 1fr 1fr 1.5fr",
        gridTemplateRows: "1fr 1fr",
        gap: "20px",
        height: "calc(100vh - 120px)",
        cursor: "pointer",
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
        gridColumn: "1 / 3",
        gridRow: "1 / 2",
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
        gridColumn: "3 / 4",
        gridRow: "1 / 2",
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
        gridColumn: "4 / 4",
        gridRow: "1 / 4",
        borderRadius: "20px",
        border: "2px solid #000",
        padding: "16px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",

        backgroundImage: "url('/assets/garden.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    },

    cardAnalytics: {
        gridColumn: "2 / 4",
        gridRow: "2 / 4",
        borderRadius: "20px",
        border: "2px solid #000",
        padding: "16px",
        fontSize: "30px",
        fontWeight: "600",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    cardAboutJournaling: {
        gridColumn: "1 / 2",
        gridRow: "2 / 4",
        borderRadius: "20px",
        border: "2px solid #000",
        padding: "16px",
        fontSize: "30px",
        fontWeight: "600",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
};
