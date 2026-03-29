import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import gardenBg from "../assets/garden.jpg";
import {
    getWaterAnalytics,
    getSleepAnalytics,
    getTodosAnalytics,
    getMoodAnalytics,
} from "../api/AnalyticsApi";

const today = new Date();
const last30Days = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (29 - i));
    return {
        key: d.toISOString().split('T')[0],
        label: `${d.getDate()}.${d.getMonth() + 1}`,
    };
});

const avg = (arr) => arr.filter(v => v > 0).reduce((s, v) => s + v, 0) / (arr.filter(v => v > 0).length || 1);

const getMotivationalQuote = (water, sleep, todos, mood) => {
    const waterAvg  = avg(water.values);
    const sleepAvg  = avg(sleep.values);
    const todoAvg   = avg(todos.values);
    const moodAvg   = avg(mood.values);

    const score =
        (waterAvg >= 2   ? 1 : waterAvg >= 1   ? 0.5 : 0) +
        (sleepAvg >= 7.5 ? 1 : sleepAvg >= 6   ? 0.5 : 0) +
        (todoAvg  >= 3   ? 1 : todoAvg  >= 1   ? 0.5 : 0) +
        (moodAvg  >= 2.5 ? 1 : moodAvg  >= 1.5 ? 0.5 : 0);

    if (score >= 3.5) return "You're absolutely crushing it. Keep going!";
    if (score >= 3.0) return "You did great this month. Stay consistent!";
    if (score >= 2.5) return "Solid month – you're building great habits!";
    if (score >= 2.0) return "Good effort! Every step forward counts.";
    if (score >= 1.5) return "You showed up. That's already half the battle.";
    if (score >= 1.0) return "Tough month? No worries – tomorrow is a fresh start.";
    return "The best time to start is now. You've got this!";
};

const useTypewriter = (text, speed = 60) => {
    const [displayed, setDisplayed] = useState('');

    useEffect(() => {
        setDisplayed('');
        let i = 0;
        const interval = setInterval(() => {
            setDisplayed(text.slice(0, i + 1));
            i++;
            if (i >= text.length) clearInterval(interval);
        }, speed);
        return () => clearInterval(interval);
    }, [text, speed]);

    return displayed;
};

const useFadeIn = () => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.15 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return [ref, visible];
};

const BarChart = ({ data, labels, yAxisLabels, yTicks = 5, animated = false }) => {
    const width = 700;
    const height = 220;
    const paddingLeft = 72;
    const paddingRight = 12;
    const paddingTop = 12;
    const paddingBottom = 40;
    const chartWidth = width - paddingLeft - paddingRight;
    const chartHeight = height - paddingTop - paddingBottom;

    const barCount = data.values.length;
    const gap = chartWidth / barCount;
    const barWidth = gap * 0.6;
    const rawStep = data.yMax / yTicks;
    const magnitude = Math.pow(10, Math.floor(Math.log10(rawStep || 1)));
    const normalized = rawStep / magnitude;
    let niceN;
    if      (normalized <= 1)   niceN = 1;
    else if (normalized <= 2)   niceN = 2;
    else if (normalized <= 2.5) niceN = 2.5;
    else if (normalized <= 5)   niceN = 5;
    else                        niceN = 10;
    const yStep    = niceN * magnitude;
    const niceYMax = yStep * yTicks;

    const getX = (i) => paddingLeft + i * gap + gap / 2;
    const getY = (val) => paddingTop + chartHeight - (val / niceYMax) * chartHeight;
    const getBarH = (val) => Math.max(0, (val / niceYMax) * chartHeight);

    return (
        <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
            {Array.from({ length: yTicks + 1 }, (_, i) => {
                const val = parseFloat((i * yStep).toFixed(4));
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
                    style={{
                        transformBox: 'fill-box',
                        transformOrigin: 'bottom',
                        transform: animated ? 'scaleY(1)' : 'scaleY(0)',
                        transition: animated
                            ? `transform 1.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 20}ms`
                            : 'none',
                    }}
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

const ChartCard = ({ chartConfig, align, loading, moodLabels, yTicks }) => {
    const isRight = align === 'right';
    const [ref, visible] = useFadeIn();

    return (
        <section
            ref={ref}
            style={{
                ...styles.card,
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(32px)',
                transition: 'opacity 1.2s ease, transform 1.2s ease',
            }}
        >
            <div style={{ ...styles.cardInner, flexDirection: isRight ? 'row' : 'row-reverse' }}>
                <div style={{ ...styles.textSide, alignItems: isRight ? 'flex-end' : 'flex-start' }}>
                    <div style={styles.chartTitle}>{chartConfig.label}</div>
                    <div style={styles.chartDesc}>{chartConfig.description}</div>
                    {loading && <div style={styles.loadingBadge}>Lädt…</div>}
                </div>
                <div style={styles.chartSide}>
                    <BarChart data={chartConfig} labels={last30Days.map(d => d.label)} yAxisLabels={moodLabels} yTicks={yTicks} animated={visible} />
                </div>
            </div>
        </section>
    );
};

const StatsPage = () => {
    let navigate = useNavigate();
    const { isAuthenticated, username, logout } = useAuth();

    const [heroRef, heroVisible] = useFadeIn();

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

    const allLoaded = !waterLoading && !sleepLoading && !todoLoading && !moodLoading;
    const motto = allLoaded
        ? getMotivationalQuote(waterData, sleepData, todoData, moodData)
        : '';
    const typedMotto = useTypewriter(motto);

    useEffect(() => {
        const fetchWater = async () => {
            try {
                const json = await getWaterAnalytics();
                const byDate = {};
                (json.dailyBreakdown || []).forEach(({ date, waterIntake }) => {
                    byDate[date] = waterIntake;
                });
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
                const json = await getSleepAnalytics();
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

        const fetchTodo = async () => {
            try {
                const json = await getTodosAnalytics();
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
                const json = await getMoodAnalytics();
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

        fetchWater();
        fetchSleep();
        fetchTodo();
        fetchMood();
    }, []);

    return (
        <div style={styles.page}>
            <header style={styles.header}>
                <div style={styles.logo} onClick={() => navigate("/")}>Daily Drift</div>

                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    {isAuthenticated && username && (
                        <>
                            <span style={styles.userInfo}>
                                Currently logged in as: <strong>{username}</strong>
                            </span>
                            <button style={styles.menuButton} onClick={() => { logout(); navigate("/"); }}>
                                Logout
                            </button>
                        </>
                    )}
                    <button style={styles.menuButton} onClick={() => navigate("/")}>Home</button>
                </div>
            </header>

            <section
                ref={heroRef}
                style={{
                    ...styles.cardGood,
                    opacity: heroVisible ? 1 : 0,
                    transform: heroVisible ? 'translateY(0)' : 'translateY(32px)',
                    transition: 'opacity 1.2s ease, transform 1.2s ease',
                }}
            >
                <div style={styles.grid}>
                    <section style={styles.cardPicture}></section>
                    <section style={styles.logoGood}>
                        {typedMotto}
                        <span style={{ borderRight: '3px solid #000', marginLeft: '4px', animation: 'blink 0.8s step-end infinite' }} />
                        <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
                    </section>
                </div>
            </section>

            {waterError && <div style={styles.errorBanner}>Water-Daten konnten nicht geladen werden: {waterError}</div>}
            {sleepError && <div style={styles.errorBanner}>Sleep-Daten konnten nicht geladen werden: {sleepError}</div>}
            {todoError  && <div style={styles.errorBanner}>Todo-Daten konnten nicht geladen werden: {todoError}</div>}
            {moodError  && <div style={styles.errorBanner}>Mood-Daten konnten nicht geladen werden: {moodError}</div>}

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
    userInfo: {
        fontSize: "14px",
        fontWeight: "400",
        color: "#333",
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: '2fr 4.5fr',
        gap: '0px',
        height: '100%',
        width: '100%',
    },
    cardGood: {
        borderRadius: '20px',
        border: '2px solid #000',
        overflow: 'hidden',
        height: 'calc(75vh - 120px)',
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
        height: '100%',
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
        flex: '1 0 0',
        minWidth: 0,
    },
    chartTitle: {
        fontSize: '27px',
        fontWeight: '600',
        marginBottom: '10px'
    },
    chartDesc: {
        fontSize: '20px',
        fontWeight: '300',
        lineHeight: '1.6',
        color: '#555'
    },
    loadingBadge: {
        marginTop: '8px',
        fontSize: '11px', color: '#999',
        fontStyle: 'italic'
    },
    chartSide: {
        flex: '2 0 0',
        minWidth: 0,
    },
};

export default StatsPage;