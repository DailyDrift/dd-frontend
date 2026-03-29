import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// ─── API ──────────────────────────────────────────────────────────────────────

const API_BASE = "http://localhost:3000";
const authHeader = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
});

const saveJournal = (payload) =>
    fetch(`${API_BASE}/v1/journal/today`, {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify(payload),
    });

// ─── useDebounced ─────────────────────────────────────────────────────────────
// Hält einen lokalen Anzeigewert und gibt den "committed" Wert erst nach
// `delay` ms Ruhe weiter – verhindert zu viele State-Updates beim Klicken.

function useDebounced(committed, onCommit, delay = 600) {
    const [local, setLocal] = useState(committed);
    const timerRef = useRef(null);

    // Falls der Parent-Wert sich von außen ändert (z.B. nach API-Load),
    // übernehmen wir ihn ohne Debounce.
    const prevCommitted = useRef(committed);
    useEffect(() => {
        if (prevCommitted.current !== committed) {
            prevCommitted.current = committed;
            setLocal(committed);
        }
    }, [committed]);

    const change = (newVal) => {
        setLocal(newVal);
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            prevCommitted.current = newVal;
            onCommit(newVal);
        }, delay);
    };

    useEffect(() => () => clearTimeout(timerRef.current), []);

    return [local, change];
}

// ─── Water Card ───────────────────────────────────────────────────────────────

function WaterCard({ value, onChange }) {
    const step = 0.25, max = 6;
    const [local, setLocal] = useDebounced(value, onChange, 600);
    const pct = Math.min(local / max, 1);

    return (
        <div style={c.cardInner}>
            <div style={c.label}>Water</div>
            <div style={c.waterGlass}>
                <div style={{ ...c.waterFill, height: `${pct * 100}%` }} />
                <span style={c.waterText}>{local.toFixed(2)} L</span>
            </div>
            <div style={c.row}>
                <button style={c.circleBtn} onClick={() => setLocal(Math.max(0, +(local - step).toFixed(2)))}>−</button>
                <span style={c.hint}>±0.25 L</span>
                <button style={c.circleBtn} onClick={() => setLocal(Math.min(max, +(local + step).toFixed(2)))}>+</button>
            </div>
            <span style={c.glassHint}>0.25l ≈ 1 Glass of Water</span>
        </div>
    );
}

// ─── Mood Card ────────────────────────────────────────────────────────────────

const MOODS = [
    { label: "bad",  emoji: "😞", value: 0, color: "#E74C3C" },
    { label: "okay", emoji: "😐", value: 1, color: "#F39C12" },
    { label: "good", emoji: "😊", value: 2, color: "#27AE60" },
];

function MoodCard({ value, onChange }) {
    return (
        <div style={c.cardInner}>
            <div style={c.label}>Mood</div>
            <div style={c.moodRow}>
                {MOODS.map(m => (
                    <button
                        key={m.label}
                        style={{
                            ...c.moodBtn,
                            background: value === m.value ? m.color : "#f5f5f5",
                            color: value === m.value ? "#fff" : "#333",
                            transform: value === m.value ? "scale(1.08)" : "scale(1)",
                        }}
                        onClick={() => onChange(m.value)}
                    >
                        <span style={{ fontSize: "26px" }}>{m.emoji}</span>
                        <span style={{ fontSize: "11px", fontWeight: 600 }}>{m.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

// ─── Sleep Card ───────────────────────────────────────────────────────────────

function SleepCard({ value, onChange }) {
    const [local, setLocal] = useDebounced(value, onChange, 600);
    const r = 44, cx = 60, cy = 60;
    const pct = local / 24;
    const angle = pct * 2 * Math.PI - Math.PI / 2;
    const ex = cx + r * Math.cos(angle);
    const ey = cy + r * Math.sin(angle);
    const largeArc = pct > 0.5 ? 1 : 0;
    const arcPath = pct <= 0 ? null :
        pct >= 1
            ? `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx - 0.01} ${cy - r}`
            : `M ${cx} ${cy - r} A ${r} ${r} 0 ${largeArc} 1 ${ex} ${ey}`;

    return (
        <div style={c.cardInner}>
            <div style={c.label}>Sleep</div>
            <svg width="120" height="120" viewBox="0 0 120 120" style={{ display: "block", margin: "0 auto" }}>
                <circle cx={cx} cy={cy} r={r} fill="none" stroke="#eee" strokeWidth="9" />
                {arcPath && <path d={arcPath} fill="none" stroke="#9B59B6" strokeWidth="9" strokeLinecap="round" />}
                <text x={cx} y={cy + 7} textAnchor="middle" fontSize="17" fontWeight="700" fill="#222">{local}h</text>
            </svg>
            <div style={c.row}>
                <button style={c.circleBtn} onClick={() => setLocal(Math.max(0, +(local - 0.5).toFixed(1)))}>−</button>
                <span style={c.hint}>±0.5 h</span>
                <button style={c.circleBtn} onClick={() => setLocal(Math.min(24, +(local + 0.5).toFixed(1)))}>+</button>
            </div>
        </div>
    );
}

// ─── Todos Card ───────────────────────────────────────────────────────────────

function TodosCard({ todos, onAdd, onToggle }) {
    const [input, setInput] = useState("");

    const handleAdd = () => {
        if (!input.trim()) return;
        onAdd(input.trim());
        setInput("");
    };

    return (
        <div style={{ ...c.cardInner, justifyContent: "flex-start", gap: "10px" }}>
            <div style={c.label}>Todos</div>
            <div style={c.todoInputRow}>
                <input
                    style={c.todoInput}
                    value={input}
                    placeholder="New Task…"
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleAdd()}
                />
                <button style={c.addBtn} onClick={handleAdd}>+</button>
            </div>
            <div style={c.todoList}>
                {todos.length === 0 && <div style={c.emptyHint}>No Todos</div>}
                {todos.map((todo, i) => (
                    <div key={i} style={c.todoItem} onClick={() => onToggle(i)}>
                        <span style={{
                            ...c.todoCheck,
                            background: todo.done ? "#27AE60" : "transparent",
                            borderColor: todo.done ? "#27AE60" : "#bbb",
                        }}>
                            {todo.done && "✓"}
                        </span>
                        <span style={{
                            fontSize: "13px",
                            textDecoration: todo.done ? "line-through" : "none",
                            color: todo.done ? "#aaa" : "#222",
                        }}>
                            {todo.content}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function DailysPage() {
    const navigate = useNavigate();

    const [journal, setJournal] = useState({
        waterIntake: 0,
        mood: null,
        sleepHours: 7,
        workout: 0,
        todos: [],
    });

    const [loadingToday, setLoadingToday] = useState(true);
    const [syncStatus, setSyncStatus] = useState("idle"); // idle | saving | saved | error
    const isFirstLoad = useRef(true);
    const debounceRef = useRef(null);

    // Fetch today on mount
    useEffect(() => {
        fetch(`${API_BASE}/v1/journal/today`, { headers: authHeader() })
            .then(r => r.ok ? r.json() : null)
            .then(data => {
                if (data) {
                    setJournal({
                        waterIntake: data.waterIntake ?? 0,
                        mood:        data.mood        ?? null,
                        sleepHours:  data.sleepHours  ?? 7,
                        workout:     data.workout     ?? 0,
                        todos:       data.todos        ?? [],
                    });
                }
            })
            .catch(() => {})
            .finally(() => {
                setLoadingToday(false);
                setTimeout(() => { isFirstLoad.current = false; }, 50);
            });
    }, []);

    // Auto-save with 800ms debounce whenever journal changes
    useEffect(() => {
        if (isFirstLoad.current) return;

        clearTimeout(debounceRef.current);
        setSyncStatus("saving");

        debounceRef.current = setTimeout(async () => {
            try {
                const res = await saveJournal(journal);
                // Sync back server response to get todo IDs
                if (res.ok) {
                    const data = await res.json();
                    if (data) {
                        setJournal(j => ({
                            ...j,
                            waterIntake: data.waterIntake ?? j.waterIntake,
                            mood:        data.mood        ?? j.mood,
                            sleepHours:  data.sleepHours  ?? j.sleepHours,
                            workout:     data.workout     ?? j.workout,
                            todos:       data.todos        ?? j.todos,
                        }));
                    }
                }
                setSyncStatus("saved");
                setTimeout(() => setSyncStatus("idle"), 2000);
            } catch {
                setSyncStatus("error");
                setTimeout(() => setSyncStatus("idle"), 3000);
            }
        }, 800);

        return () => clearTimeout(debounceRef.current);
    }, [journal]);

    const update = (key, value) => setJournal(j => ({ ...j, [key]: value }));
    const addTodo = (content) => setJournal(j => ({ ...j, todos: [...j.todos, { content, done: false }] }));

    const toggleTodo = async (i) => {
        const todo = journal.todos[i];
        const newDone = !todo.done;

        // Optimistic update
        setJournal(j => ({
            ...j,
            todos: j.todos.map((t, idx) => idx === i ? { ...t, done: newDone } : t),
        }));

        if (todo.id) {
            try {
                await fetch(`${API_BASE}/v1/journal/todos/${todo.id}`, {
                    method: "PATCH",
                    headers: authHeader(),
                    body: JSON.stringify({ done: newDone }),
                });
            } catch (e) {
                // Revert on failure
                setJournal(j => ({
                    ...j,
                    todos: j.todos.map((t, idx) => idx === i ? { ...t, done: !newDone } : t),
                }));
                console.error(e);
            }
        }
    };

    const syncLabel = { idle: "", saving: "saving…", error: "⚠ Error" };
    const syncColor = { idle: "transparent", saving: "#999", saved: "#27AE60", error: "#E74C3C" };

    return (
        <div style={styles.page}>
            <header style={styles.header}>
                <div style={styles.logo} onClick={() => navigate("/")}>Daily Drift</div>
                <span style={{ fontSize: "13px", color: syncColor[syncStatus], transition: "color 0.3s", fontWeight: 500 }}>
                    {syncLabel[syncStatus]}
                </span>
                <button style={styles.menuButton} onClick={() => navigate("/")}>Home</button>
            </header>

            <main style={{ ...styles.grid, position: "relative" }}>
                {loadingToday && (
                    <div style={styles.loadingOverlay}>
                        <span style={{ fontSize: "16px", fontWeight: 600, color: "#999" }}>Loading…</span>
                    </div>
                )}

                <section style={styles.cardWater}>
                    <WaterCard value={journal.waterIntake} onChange={v => update("waterIntake", v)} />
                </section>

                <section style={styles.cardMood}>
                    <MoodCard value={journal.mood} onChange={v => update("mood", v)} />
                </section>

                <section style={styles.cardTodos}>
                    <TodosCard todos={journal.todos} onAdd={addTodo} onToggle={toggleTodo} />
                </section>

                <section style={styles.cardSleep}>
                    <SleepCard value={journal.sleepHours} onChange={v => update("sleepHours", v)} />
                </section>

                <section style={styles.cardAnalytics} onClick={() => navigate("/analytics")}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontSize: "30px", fontWeight: 600 }}>Analytics</span>
                    </div>
                </section>
            </main>
        </div>
    );
}

// ─── Card styles ──────────────────────────────────────────────────────────────

const c = {
    cardInner: {
        width: "100%", height: "100%",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "space-between",
        gap: "10px", boxSizing: "border-box",
    },
    label: { fontSize: "15px", fontWeight: "700", alignSelf: "flex-start" },
    waterGlass: {
        width: "64px", height: "80px", borderRadius: "10px",
        border: "2px solid #5B8DEF", position: "relative",
        overflow: "hidden", background: "#f0f6ff",
        display: "flex", alignItems: "center", justifyContent: "center",
    },
    waterFill: {
        position: "absolute", bottom: 0, left: 0, right: 0,
        background: "#5B8DEF", opacity: 0.45,
        transition: "height 0.3s ease",
    },
    waterText: { position: "relative", zIndex: 1, fontSize: "12px", fontWeight: "700", color: "#2255bb" },
    row: { display: "flex", alignItems: "center", gap: "10px" },
    hint: { fontSize: "11px", color: "#999" },
    circleBtn: {
        width: "34px", height: "34px", borderRadius: "50%",
        border: "2px solid #000", background: "white",
        fontSize: "18px", cursor: "pointer", fontWeight: "700",
        display: "flex", alignItems: "center", justifyContent: "center",
    },
    moodRow: { display: "flex", gap: "6px", width: "100%", flex: 1, alignItems: "center" },
    moodBtn: {
        flex: 1, padding: "8px 4px", borderRadius: "12px",
        border: "none", cursor: "pointer",
        display: "flex", flexDirection: "column",
        alignItems: "center", gap: "4px", transition: "all 0.2s",
    },
    todoInputRow: { display: "flex", width: "100%", gap: "6px" },
    todoInput: {
        flex: 1, padding: "7px 10px", borderRadius: "10px",
        border: "2px solid #ddd", fontSize: "13px",
        outline: "none", fontFamily: "inherit",
    },
    addBtn: {
        width: "34px", height: "34px", borderRadius: "10px",
        border: "2px solid #000", background: "#000", color: "white",
        fontSize: "20px", cursor: "pointer", flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
    },
    todoList: {
        width: "100%", flex: 1, overflowY: "auto",
        display: "flex", flexDirection: "column", gap: "5px",
    },
    todoItem: {
        display: "flex", alignItems: "center", gap: "8px",
        padding: "7px 10px", borderRadius: "10px",
        background: "#f8f8f8", cursor: "pointer",
    },
    todoCheck: {
        width: "18px", height: "18px", borderRadius: "5px",
        border: "2px solid #bbb", display: "flex",
        alignItems: "center", justifyContent: "center",
        fontSize: "11px", color: "white", flexShrink: 0,
        fontWeight: "700", transition: "all 0.2s",
    },
    glassHint: { fontSize: "11px", color: "#999", textAlign: "center" },
    emptyHint: { fontSize: "13px", color: "#bbb", textAlign: "center", marginTop: "8px" },
};

// ─── Page styles ──────────────────────────────────────────────────────────────

const styles = {
    page: {
        minHeight: "100vh", padding: "16px", boxSizing: "border-box",
        fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#fff",
    },
    header: {
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "12px 16px", borderRadius: "16px",
        border: "2px solid #000", marginBottom: "16px",
    },
    logo: { fontSize: "24px", fontWeight: "600", cursor: "pointer" },
    menuButton: {
        borderRadius: "16px", border: "2px solid #000",
        padding: "8px 16px", background: "white", cursor: "pointer",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "0.8fr 1fr 1fr 1.5fr",
        gridTemplateRows: "1fr 1fr",
        gap: "16px",
        height: "calc(100vh - 120px)",
    },
    cardWater:     { gridColumn: "1 / 3", gridRow: "1 / 2", borderRadius: "20px", border: "2px solid #000", padding: "16px", overflow: "hidden" },
    cardMood:      { gridColumn: "3 / 4", gridRow: "1 / 2", borderRadius: "20px", border: "2px solid #000", padding: "16px", overflow: "hidden" },
    cardTodos:     { gridColumn: "4 / 5", gridRow: "1 / 3", borderRadius: "20px", border: "2px solid #000", padding: "16px", overflow: "hidden" },
    cardSleep:     { gridColumn: "1 / 2", gridRow: "2 / 3", borderRadius: "20px", border: "2px solid #000", padding: "16px", overflow: "hidden" },
    cardAnalytics: { gridColumn: "2 / 4", gridRow: "2 / 3", borderRadius: "20px", border: "2px solid #000", padding: "16px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" },
    loadingOverlay: {
        position: "absolute", inset: 0, background: "rgba(255,255,255,0.75)",
        display: "flex", alignItems: "center", justifyContent: "center",
        borderRadius: "20px", zIndex: 10, backdropFilter: "blur(2px)",
    },
};