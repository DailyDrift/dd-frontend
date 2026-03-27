import { useNavigate } from "react-router-dom";
import YABg from "../assets/YA.jpg";
import BEBg from "../assets/BE.jpg";

export default function AboutPage() {
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
                <section style={styles.cardAboutYa}></section>
                <section style={styles.cardAboutBe}></section>
                <section style={styles.logoYa}>Yanik Hofmann <br /> Logic and Backend <br /> Computer Science Student</section>
                <section style={styles.logoBe}>Belinda Lattka <br /> Design and Frontend <br /> Computer Science Student</section>
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
    logoBe: {
        gridColumn: "4 / 5",
        gridRow: "3 / 3",
        fontSize: "24px",
        fontWeight: "500",
        textAlign: "center",
        justifyContent: "top",
    },
    logoYa: {
        gridColumn: "2 / 3",
        gridRow: "3 / 3",
        fontSize: "24px",
        fontWeight: "500",
        textAlign: "center",
        justifyContent: "top",
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
        gridTemplateColumns: " 1fr 1.2fr 0.6fr 1.2fr 1fr",
        gridTemplateRows: "0.1fr 1.8fr 1fr",
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
    cardAboutYa: {
        gridColumn: "2 / 3",
        gridRow: "2 / 3",
        borderRadius: "900px",
        border: "2px solid #000",
        padding: "16px",
        fontSize: "30px",
        fontWeight: "600",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        backgroundImage: `url(${YABg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    },
    cardAboutBe: {
        gridColumn: "4 / 5",
        gridRow: "2 / 3",
        borderRadius: "360px",
        border: "2px solid #000",
        padding: "16px",
        fontSize: "30px",
        fontWeight: "600",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        backgroundImage: `url(${BEBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    },
};
