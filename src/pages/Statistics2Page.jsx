import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import gardenBg from "../assets/garden.jpg";

// ─── API CONFIG ───────────────────────────────────────────────────────────────

const API_BASE = "http://localhost:3000";

// ─── STATIC CHART DATA (Sleep, Todos, Mood – noch hardcoded) ─────────────────

const today = new Date();
const last30Days = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (29 - i));
    return {
        key: d.toISOString().split('T')[0],
        label: `${d.getDate()}.${d.getMonth() + 1}`,
    };
});



// ─── Bar Chart Component ──────────────────────────────────────────────────────

const BarChart = ({ data, labels, yAxisLabels, yTicks = 5 }) => {
    const width = 700;
    const height = 220;
    const paddingLeft = 44;
    const paddingRight = 12;
    const paddingTop = 12;
    const paddingBottom = 40;
    const chartWidth = width - paddingLeft - paddingRight;
    const chartHeight = height - paddingTop - paddingBottom;

    const barCount = data.values.length;
    const gap = chartWidth / barCount;
    const barWidth = gap * 0.6;
    const yStep = data.yMax / yTicks;

    const getX = (i) => paddingLeft + i * gap + gap / 2;
    const getY = (val) => paddingTop + chartHeight - (val / data.yMax) * chartHeight;
    const getBarH = (val) => Math.max(0, (val / data.yMax) * chartHeight);

    return (
        <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
            {Array.from({ length: yTicks + 1 }, (_, i) => {
                const val = i * yStep;
                const y = getY(val);
                return (
                    <g key={i}>
                        <line x1={paddingLeft} y1={y} x2={width - paddingRight} y2={y} stroke="#e0e0e0" strokeWidth="1" />
                        <text x={paddingLeft - 6} y={y + 4} textAnchor="end" fontSize="11" fill="#888">
                            {yAxisLabels ? yAxisLabels[i] ?? '' : `${val % 1 === 0 ? val : val.toFixed(1)}${data.unit}`}
                        </text>
                    </g>
                );
            })}

            {data.values.map((val, i) => (
                <rect
                    key={i}
                    x={getX(i) - barWidth / 2}
                    y={getY(val)}
                    width={barWidth}
                    height={getBarH(val)}
                    rx={3}
                    fill={data.color}
                    opacity={val === 0 ? 0.15 : 0.85}
                />
            ))}

            {labels.map((label, i) => {
                if (i % 5 !== 0) return null;
                return (
                    <text key={i} x={getX(i)} y={height - paddingBottom + 16} textAnchor="middle" fontSize="11" fill="#888">
                        {label}
                    </text>
                );
            })}

            <line x1={paddingLeft} y1={paddingTop} x2={paddingLeft} y2={height - paddingBottom} stroke="#ccc" strokeWidth="1.5" />
            <line x1={paddingLeft} y1={height - paddingBottom} x2={width - paddingRight} y2={height - paddingBottom} stroke="#ccc" strokeWidth="1.5" />
        </svg>
    );
};

// ─── Chart Card ───────────────────────────────────────────────────────────────

const ChartCard = ({ chartConfig, align, loading, moodLabels, yTicks }) => {
    const isRight = align === 'right';
    return (
        <section style={styles.card}>
            <div style={{ ...styles.cardInner, flexDirection: isRight ? 'row' : 'row-reverse' }}>
                <div style={styles.textSide}>
                    <div style={styles.chartTitle}>{chartConfig.label}</div>
                    <div style={styles.chartDesc}>{chartConfig.description}</div>
                    {loading && <div style={styles.loadingBadge}>Lädt…</div>}
                </div>
                <div style={styles.chartSide}>
                    <BarChart data={chartConfig} labels={last30Days.map(d => d.label)} yAxisLabels={moodLabels} yTicks={yTicks} />
                </div>
            </div>
        </section>
    );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

const StatsPage = () => {
    let navigate = useNavigate();

    const [waterData, setWaterData] = useState({
        label: "Water consumption",
        unit: "L",
        yMax: 4,
        color: "#5B8DEF",
        description: "An average human should consume at least 2L of Water a Day.",
        values: new Array(30).fill(0),
    });
    const [waterLoading, setWaterLoading] = useState(true);
    const [waterError, setWaterError] = useState(null);

    const [sleepData, setSleepData] = useState({
        label: "Sleep",
        unit: "h",
        yMax: 12,
        color: "#9B59B6",
        description: "A good sleep supports your body's efficiency every day.",
        values: new Array(30).fill(0),
    });
    const [sleepLoading, setSleepLoading] = useState(true);
    const [sleepError, setSleepError] = useState(null);

    const [todoData, setTodoData] = useState({
        label: "Todos",
        unit: " done",
        yMax: 10,
        color: "#27AE60",
        description: "Setting up todos is a great way to prevent procrastination.",
        values: new Array(30).fill(0),
    });
    const [todoLoading, setTodoLoading] = useState(true);
    const [todoError, setTodoError] = useState(null);

    // Mood: 0 = bad, 1 = okay, 2 = good
    const [moodData, setMoodData] = useState({
        label: "Daily Mood",
        unit: "",
        yMax: 3,
        color: "#E67E22",
        description: "Your daily mood can help you achieve your goals quicker.",
        values: new Array(30).fill(0),
    });
    const [moodLoading, setMoodLoading] = useState(true);
    const [moodError, setMoodError] = useState(null);

    useEffect(() => {
        const fetchWater = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const res = await fetch(`${API_BASE}/v1/analytics/water`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const json = await res.json();

                // dailyBreakdown nach Datum indexieren
                const byDate = {};
                (json.dailyBreakdown || []).forEach(({ date, waterIntake }) => {
                    byDate[date] = waterIntake;
                });

                // Für jeden der letzten 30 Tage den Wert holen (0 wenn kein Eintrag)
                const values = last30Days.map(({ key }) => byDate[key] ?? 0);
                const maxVal = Math.max(...values, 4);

                setWaterData(prev => ({ ...prev, values, yMax: Math.ceil(maxVal) }));
                setWaterError(null);
            } catch (err) {
                setWaterError(err.message);
            } finally {
                setWaterLoading(false);
            }
        };

        const fetchSleep = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const res = await fetch(`${API_BASE}/v1/analytics/sleep`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const json = await res.json();

                const byDate = {};
                (json.dailyBreakdown || []).forEach(({ date, sleepHours }) => {
                    byDate[date] = sleepHours;
                });

                const values = last30Days.map(({ key }) => byDate[key] ?? 0);
                const maxVal = Math.max(...values, 12);

                setSleepData(prev => ({ ...prev, values, yMax: Math.ceil(maxVal) }));
                setSleepError(null);
            } catch (err) {
                setSleepError(err.message);
            } finally {
                setSleepLoading(false);
            }
        };

        fetchWater();
        fetchSleep();

        const fetchTodo = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const res = await fetch(`${API_BASE}/v1/analytics/todos`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const json = await res.json();

                const byDate = {};
                (json.dailyBreakdown || []).forEach(({ date, completed }) => {
                    byDate[date] = completed;
                });

                const values = last30Days.map(({ key }) => byDate[key] ?? 0);
                const maxVal = Math.max(...values, 5);

                setTodoData(prev => ({ ...prev, values, yMax: Math.ceil(maxVal) }));
                setTodoError(null);
            } catch (err) {
                setTodoError(err.message);
            } finally {
                setTodoLoading(false);
            }
        };

        const fetchMood = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const res = await fetch(`${API_BASE}/v1/analytics/mood`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const json = await res.json();

                const moodShift = { 0: 1, 1: 2, 2: 3 };
                const byDate = {};
                (json.dailyBreakdown || []).forEach(({ date, mood }) => {
                    byDate[date] = moodShift[mood] ?? null;
                });

                const values = last30Days.map(({ key }) => byDate[key] ?? 0);

                setMoodData(prev => ({ ...prev, values, yMax: 3 }));
                setMoodError(null);
            } catch (err) {
                setMoodError(err.message);
            } finally {
                setMoodLoading(false);
            }
        };

        fetchTodo();
        fetchMood();
    }, []);

    return (
        <div style={styles.page}>
            <header style={styles.header}>
                <div style={styles.logo} onClick={() => navigate("/")}>Daily Drift</div>
                <button style={styles.menuButton} onClick={() => navigate("/")}>Home</button>
            </header>

            <section style={styles.cardGood}>
                <div style={styles.grid}>
                    <section style={styles.cardPicture}></section>
                    <section style={styles.logoGood}>You did good this Month!</section>
                </div>
            </section>

            {waterError && (
                <div style={styles.errorBanner}>⚠️ Water-Daten konnten nicht geladen werden: {waterError}</div>
            )}
            {sleepError && (
                <div style={styles.errorBanner}>⚠️ Sleep-Daten konnten nicht geladen werden: {sleepError}</div>
            )}
            {todoError && (
                <div style={styles.errorBanner}>⚠️ Todo-Daten konnten nicht geladen werden: {todoError}</div>
            )}
            {moodError && (
                <div style={styles.errorBanner}>⚠️ Mood-Daten konnten nicht geladen werden: {moodError}</div>
            )}

            <div style={styles.chartsContainer}>
                <ChartCard chartConfig={waterData} align="right" loading={waterLoading} />
                <ChartCard chartConfig={sleepData}  align="left"  loading={sleepLoading} />
                <ChartCard chartConfig={todoData}   align="right" loading={todoLoading} moodLabels={null} />
                <ChartCard chartConfig={moodData}   align="left"  loading={moodLoading} moodLabels={['', 'bad','okay','good']} yTicks={3} />
            </div>
        </div>
    );
};


const styles = {
    page: {
        minHeight: '100vh',
        background: '#fff',
        padding: '16px',
        boxSizing: 'border-box',
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        overflowY: 'scroll',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 16px',
        borderRadius: '16px',
        border: '2px solid #000',
        marginBottom: '16px',
    },
    logo: { fontSize: '24px', fontWeight: '600', cursor: 'pointer' },
    menuButton: {
        borderRadius: '16px',
        border: '2px solid #000',
        padding: '8px 16px',
        background: 'white',
        cursor: 'pointer',
        fontSize: '14px',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: '2fr 4.5fr',
        gap: '20px',
        height: 'calc(75vh - 120px)',
    },
    cardGood: {
        borderRadius: '20px',
        border: '2px solid #000',
        display: 'flex',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    logoGood: {
        gridColumn: '2 / 4',
        fontSize: '75px',
        fontWeight: '300',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
    },
    cardPicture: {
        gridColumn: '1',
        borderRight: '2px solid #000',
        overflow: 'hidden',
        backgroundImage: `url(${gardenBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    },
    errorBanner: {
        marginTop: '12px',
        padding: '10px 16px',
        borderRadius: '12px',
        background: '#fff3f3',
        border: '1px solid #f5c2c2',
        color: '#c0392b',
        fontSize: '13px',
    },
    chartsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        paddingTop: '24px',
    },
    card: {
        borderRadius: '20px',
        border: '2px solid #000',
        padding: '20px 24px',
        overflow: 'hidden',
    },
    cardInner: {
        display: 'flex',
        gap: '24px',
        alignItems: 'center',
    },
    textSide: {
        minWidth: '180px',
        maxWidth: '200px',
        flexShrink: 0,
    },
    chartTitle: { fontSize: '20px', fontWeight: '600', marginBottom: '10px' },
    chartDesc: { fontSize: '13px', fontWeight: '300', lineHeight: '1.6', color: '#555' },
    loadingBadge: { marginTop: '8px', fontSize: '11px', color: '#999', fontStyle: 'italic' },
    chartSide: { flex: 1, minWidth: 0 },
};

export default StatsPage;