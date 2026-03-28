import { useNavigate } from "react-router-dom";
import YABg from "../assets/YA.jpg";
import BEBg from "../assets/BE.jpg";

export default function AboutPage() {
    let navigate = useNavigate();
    return (
        <div style={styles.page}>
            <style>{`
                @keyframes fadeInBlur {
                    from {
                        opacity: 0;
                        filter: blur(12px);
                        transform: translateY(8px);
                    }
                    to {
                        opacity: 1;
                        filter: blur(0px);
                        transform: translateY(0px);
                    }
                }
                .img-card { animation: fadeInBlur 0.8s ease forwards; opacity: 0; animation-delay: 0.1s; }
                .text-line { animation: fadeInBlur 0.6s ease forwards; opacity: 0; }
                .line-1 { animation-delay: 0.7s; }
                .line-2 { animation-delay: 1.0s; }
                .line-3 { animation-delay: 1.3s; }
            `}</style>

            <header style={styles.header}>
                <div style={styles.logo}>Daily Drift</div>
                <button style={styles.menuButton}
                        onClick={() => navigate("/")}
                >Home</button>
            </header>

            <main style={styles.grid}>
                <section className="img-card" style={styles.cardAboutYa}></section>
                <section className="img-card" style={styles.cardAboutBe}></section>

                <section style={styles.logoYa}>
                    <span className="text-line line-1" style={styles.textName}>Yanik Hofmann</span>
                    <span className="text-line line-2" style={styles.textSub}>Computer Science Student</span>
                    <span className="text-line line-3" style={styles.textRole}>Logic and Backend</span>
                </section>

                <section style={styles.logoBe}>
                    <span className="text-line line-1" style={styles.textName}>Belinda Lattka</span>
                    <span className="text-line line-2" style={styles.textSub}>Computer Science Student</span>
                    <span className="text-line line-3" style={styles.textRole}>Design and Frontend</span>
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
        gridTemplateColumns: "1fr 1.2fr 0.6fr 1.2fr 1fr",
        gridTemplateRows: "0fr 1.4fr 0.4fr",
        gap: "0.3vw",
        height: "90vh",
    },
    logoYa: {
        gridColumn: "2 / 3",
        gridRow: "3 / 3",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: "0vh",
        marginTop: "-25vh",
        gap: "0.3vh",
    },
    logoBe: {
        gridColumn: "4 / 5",
        gridRow: "3 / 3",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: "0",
        marginTop: "-25vh",
        gap: "0.3vh",
    },
    textName: {
        fontSize: "2.5vw",
        fontWeight: "700",
    },
    textRole: {
        fontSize: "1.3vw",
        fontWeight: "400",
        color: "#555",
    },
    textSub: {
        fontSize: "1.3vw",
        fontWeight: "500",
    },
    cardAboutYa: {
        gridColumn: "2 / 3",
        gridRow: "2 / 3",
        borderRadius: "900px",
        border: "2px solid #000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "22vmin",
        maxHeight: "22vmin",
        width: "100%",
        aspectRatio: "1 / 1",
        margin: "0 auto",
        alignSelf: "flex-start",
        marginTop: "12vh",
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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "22vmin",
        maxHeight: "22vmin",
        width: "100%",
        aspectRatio: "1 / 1",
        margin: "0 auto",
        alignSelf: "flex-start",
        marginTop: "12vh",
        backgroundImage: `url(${BEBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    },
};