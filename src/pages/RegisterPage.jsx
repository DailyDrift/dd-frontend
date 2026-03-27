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
            setError(err.response?.data?.message ?? "Login fehlgeschlagen");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.page}>
            <header style={styles.header}>
                <div style={styles.logo}
                     onClick={()=> navigate("/")}
                >Daily Drift</div>
                <button style={styles.registerButton}
                        onClick={() => navigate("/")}
                >Home</button>
            </header>

            <main style={styles.grid}>
                <div style={styles.cardImage} />
                <div style={styles.cardRegister}>
                    <form onSubmit={handleSubmit} style={styles.grid2}>
                        <div style={styles.logo2}>Register</div>
                        <div style={styles.fieldGroup= {
                            gridColumn: "1 / 1",
                            gridRow: "2 / 2",}}>
                            <label style={styles.label}>Username</label>
                            <input
                                type="text"
                                style={styles.input}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                disabled={loading}
                            />
                        </div>
                        <div style={styles.fieldGroup= {
                            gridColumn: "1 / 2",
                            gridRow: "3 / 3",}}>
                            <label style={styles.label}>Password</label>
                            <input
                                type="password"
                                style={styles.input}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={loading}
                            />
                        </div>
                        <div style={styles.fieldGroup= {
                            gridColumn: "1 / 2",
                            gridRow: "4 / 4",}}>
                            <label style={styles.label}>Confirm Password</label>
                            <input
                                type="password"
                                style={styles.input}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={loading}
                            />
                        </div>

                        {error && <p style={styles.error}>{error}</p>}
                        <button
                            type="submit"
                            style={{ ...styles.submitButton, opacity: loading ? 0.5 : 1 }}
                            disabled={loading}
                        >
                            {loading ? "..." : "→"}
                        </button>
                        <div style={styles.logo3}
                             onClick={()=> navigate("/login")}
                        >You already have an Account?</div>
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
        gridRow: "1 / 1",
        fontSize: "24px",
        fontWeight: "600",
        cursor: "pointer",
    },
    logo3: {
        gridColumn: "1 / 2",
        gridRow: "5 / 5",
        fontSize: "14px",
        fontWeight: "600",
        cursor: "pointer",
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
        gridTemplateColumns: " 3fr 1.15fr ",
        gridTemplateRows: "4fr 1fr",
        gap: "20px",
        height: "calc(100vh - 120px)",
    },
    grid2: {
        display: "grid",
        gridTemplateColumns: " 3fr 1fr 1fr",
        gridTemplateRows: "0.1fr 0.1fr 0.1fr 0.1fr",
        gap: "20px",
        height: "calc(95vh - 135px)",
    },
    cardImage: {
        gridColumn: "1 / 1",
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
    cardRegister: {
        gridColumn: "2 / 2",
        gridRow: "1 / 2",
        borderRadius: "20px",
        border: "2px solid #000",
        padding: "16px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    fieldGroup: {
        display: "flex",
        flexDirection: "column",
        gap: "6px",
    },
    label: {
        fontSize: "18px",
        fontWeight: "500",
    },
    input: {
        height: "38px",
        borderRadius: "14px",
        border: "2px solid #000",
        padding: "4px 10px",
        fontSize: "16px",
        outline: "none",
    },
    submitButton: {
        gridColumn: "2 / 3",
        gridRow: "5 / 5",
        width: "70px",
        height: "50px",
        borderRadius: "50px",
        border: "2px solid #000",
        background: "#fff",
        cursor: "pointer",
        fontSize: "20px",
    },
    error: {
        gridColumn: "1 / 3",
        gridRow: "6 / 6",
        color: "red",
        fontSize: "14px",
        margin: 0,
    },
};