import React from 'react';
import { useNavigate } from "react-router-dom";
import gardenBg from "../assets/garden.jpg";

const StatsPage = () => {
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

            <section style={styles.cardGood}>
                <div  style={styles.grid}>
                    <section style={styles.cardPicture}></section>
                </div>
            </section>

            <div style={styles.chartsContainer}>
                {/* Water */}
                <section style={styles.chartCard}>
                    <div style={styles.chartTitle}>Water consumption</div>
                    <div style={styles.chart}>
                        <div style={styles.barGroup}>
                            <div style={styles.bar.blue} />
                            <div style={styles.bar.green} />
                            <div style={styles.bar.orange} />
                        </div>
                        <div style={styles.chartText}>Average should consume at least</div>
                    </div>
                </section>

                {/* Sleep */}
                <section style={styles.chartCard}>
                    <div style={styles.chartTitle}>Sleep</div>
                    <div style={styles.chart}>
                        <div style={styles.barGroup}>
                            <div style={styles.bar.blue} />
                            <div style={styles.bar.green} />
                        </div>
                        <div style={styles.chartText}>Supports your every efficiency</div>
                    </div>
                </section>

                {/* Todos */}
                <section style={styles.chartCard}>
                    <div style={styles.chartTitle}>Todos</div>
                    <div style={styles.chart}>
                        <div style={styles.barGroup}>
                            <div style={styles.bar.blue} />
                            <div style={styles.bar.green} />
                        </div>
                        <div style={styles.chartText}>Setting todos is a great way to procrastination</div>
                    </div>
                </section>

                {/* Mood */}
                <section style={styles.chartCard}>
                    <div style={styles.chartTitle}>Daily Mood</div>
                    <div style={styles.chart}>
                        <div style={styles.barGroup}>
                            <div style={styles.bar.blue} />
                            <div style={styles.bar.green} />
                            <div style={styles.bar.orange} />
                        </div>
                        <div style={styles.chartText}>Your daily mood can help you meet your goals quicker</div>
                    </div>
                </section>
            </div>
        </div>
    );
};

const styles = {
    page: {
        minHeight: '100vh',
        background: '000',
        padding: '16px',
        boxSizing: "border-box",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        overflowY: 'scroll',
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
        gridTemplateColumns: " 1fr 5fr",
        gridTemplateRows: "1fr",
        gap: "20px",
        height: "calc(75vh - 120px)",
    },
    cardGood: {
        borderRadius: "20px",
        border: "2px solid #000",
        fontSize: "30px",
        fontWeight: "500",
        display: "flex",
        justifyContent: "center",
        overflow: "hidden",
    },
    cardPicture: {
        gridColumn: "1 / 7",
        padding: "16px",
        display: "flex",
        overflow: "hidden",
        justifyContent: "flex-end",
        alignItems: "flex-end",

        backgroundImage: `url(${gardenBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    },
    successTitle: { fontSize: '2.2em', fontWeight: '700' },
    chartsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        maxWidth: '500px',
        margin: '0 auto',
    },
    chartCard: {
        background: 'white',
        borderRadius: '20px',
        padding: '30px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
        borderLeft: '6px solid #667eea',
    },
    chartTitle: {
        fontSize: '1.4em',
        fontWeight: '700',
        color: '#333',
        marginBottom: '25px',
        textAlign: 'center',
    },
    chart: { textAlign: 'center' },
    barGroup: {
        display: 'flex',
        justifyContent: 'space-around',
        marginBottom: '20px',
        height: '120px',
        alignItems: 'flex-end',
    },
    bar: {
        width: '40px',
        borderRadius: '8px 8px 4px 4px',
        margin: '0 5px',
    },
    chartText: {
        fontSize: '1em',
        color: '#666',
        lineHeight: '1.5',
    },
};

export default StatsPage;
