import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import seaBg from "../assets/sea.jpg";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError]       = useState(null);
    const [loading, setLoading]   = useState(false);
    const [showPassword, setShowPassword] = useState(false);

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

    const isDisabled = loading || !username || !password;

    return (
        <div style={styles.page}>
            <style>{fadeInKeyframes}</style>

            <header style={styles.header}>
                <div style={styles.logo} onClick={() => navigate("/")}>Daily Drift</div>
                <button style={styles.registerButton} onClick={() => navigate("/")}>Home</button>
            </header>

            <main style={styles.grid}>
                <div style={{ ...styles.cardLogin, ...fadeIn(2) }}>
                    <form onSubmit={handleSubmit} style={styles.form}>
                        <div style={{ ...styles.logo2, ...fadeIn(3) }}>Login</div>

                        <div style={{ ...styles.fieldGroup, ...fadeIn(4) }}>
                            <label style={styles.label}>Username</label>
                            <input
                                type="text"
                                style={styles.input}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                disabled={loading}
                            />
                        </div>

                        <div style={{ ...styles.fieldGroup, ...fadeIn(5) }}>
                            <label style={styles.label}>Password</label>
                            <div style={styles.inputWrapper}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    style={styles.input}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={loading}
                                />
                                <span style={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? "🙈" : "👁️"}
                                </span>
                            </div>
                        </div>

                        {error && <p style={styles.error}>{error}</p>}

                        <div style={{ ...styles.bottomRow, ...fadeIn(6) }}>
                            <span style={styles.registerLink} onClick={() => navigate("/register")}>
                                You don't have an Account?
                            </span>
                            <button
                                type="submit"
                                style={{
                                    ...styles.submitButton,
                                    opacity: isDisabled ? 0.4 : 1,
                                    cursor: isDisabled ? "not-allowed" : "pointer",
                                    background: isDisabled ? "#e0e0e0" : "#fff",
                                }}
                                disabled={isDisabled}
                            >
                                {loading ? "..." : "→"}
                            </button>
                        </div>
                    </form>
                </div>

                <div style={styles.cardImage} />
            </main>
        </div>
    );
}

// --- Animation helpers ---

const fadeInKeyframes = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(18px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

const fadeIn = (step) => ({
    animation: `fadeInUp 0.5s ease both`,
    animationDelay: `${(step - 1) * 0.08}s`,
});

// --- Styles ---

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
        fontSize: "24px",
        fontWeight: "600",
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
        gap: "20px",
        height: "calc(100vh - 120px)",
    },
    cardImage: {
        borderRadius: "20px",
        border: "2px solid #000",
        backgroundImage: `url(${seaBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    },
    cardLogin: {
        borderRadius: "20px",
        border: "2px solid #000",
        padding: "24px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "100%",
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
    inputWrapper: {
        position: "relative",
        display: "flex",
        alignItems: "center",
    },
    eyeIcon: {
        position: "absolute",
        right: "10px",
        cursor: "pointer",
        fontSize: "16px",
        userSelect: "none",
    },
    input: {
        height: "38px",
        borderRadius: "14px",
        border: "2px solid #000",
        padding: "4px 36px 4px 10px",
        fontSize: "16px",
        outline: "none",
        width: "100%",
        boxSizing: "border-box",
    },
    bottomRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    registerLink: {
        fontSize: "14px",
        fontWeight: "600",
        cursor: "pointer",
        textDecoration: "underline",
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
        color: "#c0392b",
        fontSize: "13px",
        fontWeight: "500",
        fontStyle: "italic",
        letterSpacing: "0.3px",
        margin: 0,
    },
};