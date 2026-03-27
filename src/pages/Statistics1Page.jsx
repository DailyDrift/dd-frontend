import { useNavigate } from "react-router-dom";

export default function Stat1Page() {
    let navigate = useNavigate();
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
                <section style={styles.cardWater}>Water Consumption</section>
                <section style={styles.logoWater}>25</section>
                <div style={styles.cardAna2}
                     onClick={() => navigate("/more-analytics")}
                >Take a deeper Look</div>
                <section style={styles.cardTodo}>Todos done this Month</section>
                <section style={styles.logoTodo}>25</section>
                <section style={styles.cardSleep}>Sleep per Day</section>
                <section style={styles.logoSleep}>2,5</section>
                <section style={styles.cardMood}>Your Mood this Month</section>
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
        gridTemplateColumns: " 1fr 1fr 1fr 1.2fr",
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
    cardWater: {
        gridColumn: "1 / 3",
        gridRow: "1 / 2",
        borderRadius: "20px",
        border: "2px solid #000",
        padding: "16px",
        fontSize: "30px",
        fontWeight: "500",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        overflow: "hidden",
    },
    logoWater: {
        gridColumn: "1 / 3",
        gridRow: "1 / 2",
        fontSize: "120px",
        fontWeight: "400",
        textAlign: "center",
        justifyContent: "top",
    },
    cardAna2: {
        gridColumn: "3 / 4",
        gridRow: "1 / 2",
        borderRadius: "20px",
        border: "2px solid #000",
        padding: "16px",
        fontSize: "30px",
        fontWeight: "500",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        cursor: "pointer",
    },
    cardTodo: {
        gridColumn: "4 / 4",
        gridRow: "1 / 4",
        borderRadius: "20px",
        border: "2px solid #000",
        padding: "16px",
        fontSize: "30px",
        fontWeight: "500",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        overflow: "hidden",
    },
    logoTodo: {
        gridColumn: "4 / 4",
        gridRow: "2 / 3",
        fontSize: "120px",
        fontWeight: "400",
        textAlign: "center",
        justifyContent: "top",
    },
    cardMood: {
        gridColumn: "2 / 4",
        gridRow: "2 / 4",
        borderRadius: "20px",
        border: "2px solid #000",
        padding: "16px",
        fontSize: "30px",
        fontWeight: "600",
        display: "flex",
        justifyContent: "center",
    },
    cardSleep: {
        gridColumn: "1 / 2",
        gridRow: "2 / 4",
        borderRadius: "20px",
        border: "2px solid #000",
        padding: "16px",
        fontSize: "30px",
        fontWeight: "600",
        display: "flex",
        justifyContent: "center",
    },
    logoSleep: {
        gridColumn: "1 / 2",
        gridRow: "2 / 4",
        fontSize: "120px",
        fontWeight: "400",
        textAlign: "center",
        justifyContent: "top",
    },
};
