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
                    <section style={styles.logoGood}>You did good this Month!</section>
                </div>
            </section>

            <div style={styles.chartsContainer}>
                {/* Water */}
                <section style={styles.cardRight}>
                    <div style={styles.gridR}>
                        <div style={styles.chartTitleRight}>Water consumption</div>
                        <div style={styles.chart}>
                            <div style={styles.barGroup}>
                                <div style={styles.bar.blue} />
                                <div style={styles.bar.green} />
                                <div style={styles.bar.orange} />
                            </div>
                            <div style={styles.chartTextRight}>An avergage Human should
                                consume at least 2L of
                                Water a Day.</div>
                        </div>
                    </div>
                </section>

                {/* Sleep */}
                <section style={styles.cardLeft}>
                    <div style={styles.gridL}>
                        <div style={styles.chartTitleLeft}>Sleep</div>
                        <div style={styles.chart}>
                            <div style={styles.barGroup}>
                                <div style={styles.bar.blue} />
                                <div style={styles.bar.green} />
                            </div>
                            <div style={styles.chartTextLeft}>A good sleep supports your body's efficiency every day.</div>
                        </div>
                        </div>
                </section>

                {/* Todos */}
                <section style={styles.cardRight}>
                    <div style={styles.gridR}>
                        <div style={styles.chartTitleRight}>Todos</div>
                        <div style={styles.chart}>
                            <div style={styles.barGroup}>
                                <div style={styles.bar.blue} />
                                <div style={styles.bar.green} />
                            </div>
                            <div style={styles.chartTextRight}>Setting up todos is a great way to prevent procrastination.</div>
                        </div>
                    </div>
                </section>

                {/* Mood */}
                <section style={styles.cardLeft}>
                    <div style={styles.gridL}>
                        <div style={styles.chartTitleLeft}>Daily Mood</div>
                        <div style={styles.chart}>
                            <div style={styles.barGroup}>
                                <div style={styles.bar.blue} />
                                <div style={styles.bar.green} />
                                <div style={styles.bar.orange} />
                            </div>
                            <div style={styles.chartTextLeft}>Your daily mood can help you by archiving your goals quicker.</div>
                        </div>
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
        gridTemplateColumns: " 2fr 4.5fr",
        gridTemplateRows: "1fr",
        gap: "20px",
        height: "calc(75vh - 120px)",
    },
    gridR: {
        display: "grid",
        gridTemplateColumns: " 3fr 2fr",
        gridTemplateRows: "1fr 5fr",
        gap: "20px",
        height: "calc(105vh - 260px)",
    },
    gridL: {
        display: "grid",
        gridTemplateColumns: " 2fr 3fr",
        gridTemplateRows: "1fr",
        gap: "20px",
        height: "calc(105vh - 260px)",
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
    logoGood: {
        gridColumn: "2 / 4",
        gridRow: "1",
        fontSize: "75px",
        fontWeight: "300",
        textAlign: "top",
        justifyContent: "top",
        padding: "16px",
    },
    cardPicture: {
        gridColumn: "1",
        padding: "16px",
        display: "flex",
        borderRight: "2px solid #000",
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
        paddingTop: '30px',
        margin: '0 auto',
    },
    cardRight: {
        borderRadius: "20px",
        border: "2px solid #000",
        fontSize: "30px",
        fontWeight: "500",
        display: "flex",
        padding: "16px",
        justifyContent: "center",
        overflow: "hidden",
    },
    cardLeft: {
        borderRadius: "20px",
        border: "2px solid #000",
        fontSize: "30px",
        fontWeight: "500",
        display: "flex",
        padding: "16px",
        justifyContent: "center",
        overflow: "hidden",
    },
    chartTitleRight: {
        gridColumn: "1",
        gridRow: "1",
        fontSize: '1.4em',
        fontWeight: '500',
        marginBottom: '25px',
        textAlign: 'top',
        paddingLeft: '16px',
    },
    chartTitleLeft: {
        gridColumn: "2",
        gridRow: "1",
        fontSize: '1.4em',
        fontWeight: '700',
        marginBottom: '25px',
        textAlign: 'left',
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
    chartTextLeft: {
        gridColumn: "1",
        gridRow: "2",
        fontSize: '36px',
        textAlign: 'right',
        lineHeight: '1.5',
        justifyContent: 'space-between',
        fontWeight: '300',
        alignSelf: 'center',
    },
    chartTextRight: {
        gridColumn: "2",
        gridRow: "2",
        fontSize: '36px',
        textAlign: 'left',
        lineHeight: '1.5',
        alignSelf: 'center',
        justifyContent: 'space-between',
        fontWeight: '300',
        paddingBottom: '200px',
    },
};

export default StatsPage;
