import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import seaBg from "../assets/sea.jpg";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError]       = useState(null);
    const [loading, setLoading]   = useState(false);

    const { login } = useAuth();
    const navigate  = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await login(username, password);
            navigate("/");
        } catch (err) {
            setError("Benutzername oder Passwort ist falsch.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.page}>
            <header style={styles.header}>
                <div style={styles.logo}
                     onClick={() => navigate("/")}
                >Daily Drift</div>
                <button style={styles.registerButton}
                        onClick={() => navigate("/")}
                >Home</button>
            </header>

            <main style={styles.grid}>
                <div style={styles.cardImage} />
                <div style={styles.cardLogin}>
                    <form onSubmit={handleSubmit} style={styles.grid2}>
                        <div style={styles.logo2}>Login</div>

                        <div style={{ gridColumn: "1 / 3", gridRow: "2 / 3", display: "flex", flexDirection: "column", gap: "6px" }}>
                            <label style={styles.label}>Username</label>
                            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                <input
                                    type="text"
                                    style={styles.input}
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    disabled={loading}
                                />
                                <div style={{ width: "70px", flexShrink: 0 }} />
                            </div>
                        </div>

                        <div style={{ gridColumn: "1 / 3", gridRow: "3 / 4", display: "flex", flexDirection: "column", gap: "6px" }}>
                            <label style={styles.label}>Password</label>
                            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                <input
                                    type="password"
                                    style={styles.input}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={loading}
                                />
                                <button
                                    type="submit"
                                    style={{
                                        ...styles.submitButton,
                                        opacity: (loading || !username || !password) ? 0.4 : 1,
                                        cursor: (loading || !username || !password) ? "not-allowed" : "pointer",
                                        background: (loading || !username || !password) ? "#e0e0e0" : "#fff",
                                    }}
                                    disabled={loading || !username || !password}
                                >
                                    {loading ? "..." : "→"}
                                </button>
                            </div>
                        </div>

                        {error && <p style={styles.error}>{error}</p>}

                        <div style={styles.logo3}
                             onClick={() => navigate("/register")}
                        >You don't have an Account?</div>
                    </form>
                </div>
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
    logo2: {
        gridColumn: "1 / 2",
        gridRow: "1 / 2",
        fontSize: "24px",
        fontWeight: "600",
        cursor: "pointer",
    },
    logo3: {
        gridColumn: "1 / 3",
        gridRow: "5 / 6",
        fontSize: "14px",
        fontWeight: "600",
        cursor: "pointer",
        textDecoration: "underline",
        whitespace: "nowrap",
    },
    registerButton: {
        padding: "6px 18px",
        borderRadius: "16px",
        border: "2px solid #000",
        background: "#fff",
        fontSize: "16px",
        cursor: "pointer",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "1.15fr 3fr",
        gridTemplateRows: "4fr 1fr",
        gap: "20px",
        height: "calc(100vh - 120px)",
    },
    grid2: {
        display: "grid",
        gridTemplateColumns: "3fr 1fr 1fr",
        gridTemplateRows: "0.3fr 0.1fr 0.3fr 0.1fr 0.1fr",
        gap: "20px",
        height: "calc(95vh - 135px)",
    },
    cardImage: {
        gridColumn: "2 / 3",
        gridRow: "1 / 2",
        borderRadius: "20px",
        border: "2px solid #000",
        padding: "16px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        backgroundImage: `url(${seaBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    },
    cardLogin: {
        gridColumn: "1 / 2",
        gridRow: "1 / 2",
        borderRadius: "20px",
        border: "2px solid #000",
        padding: "16px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    label: {
        fontSize: "18px",
        fontWeight: "500",
    },
    input: {
        height: "38px",
        boxSizing: "border-box",
        borderRadius: "14px",
        border: "2px solid #000",
        padding: "4px 10px",
        fontSize: "16px",
        outline: "none",
        flex: 1,
    },
    submitButton: {
        width: "70px",
        height: "38px",
        borderRadius: "14px",
        border: "2px solid #000",
        fontSize: "20px",
        transition: "all 0.2s ease",
        flexShrink: 0,
    },
    error: {
        gridColumn: "1 / 2",
        gridRow: "4 / 5",
        color: "#c0392b",
        fontSize: "13px",
        fontWeight: "500",
        fontStyle: "italic",
        letterSpacing: "0.3px",
        margin: 0,
        whiteSpace: "nowrap",
    },
};