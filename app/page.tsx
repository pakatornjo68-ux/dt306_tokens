import Link from "next/link";

export default function Home() {
  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logo}>UD</div>

        <h1 style={styles.title}>UD Smart Rental</h1>

        <p style={styles.description}>
          ระบบจัดการเช่าอุปกรณ์
        </p>

        <div style={styles.buttons}>
          <Link href="/login" style={styles.loginButton}>
            เข้าสู่ระบบ
          </Link>

          <Link href="/register" style={styles.registerButton}>
            สมัครสมาชิก
          </Link>
        </div>
      </div>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f5f7fa",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "480px",
    background: "#ffffff",
    borderRadius: "20px",
    padding: "50px 40px",
    textAlign: "center" as const,
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
  },

  logo: {
    width: "70px",
    height: "70px",
    margin: "0 auto 25px",
    borderRadius: "18px",
    background: "#2563eb",
    color: "#ffffff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "24px",
    fontWeight: "bold",
  },

  title: {
    margin: "0 0 10px",
    fontSize: "30px",
    color: "#111827",
  },

  description: {
    margin: "0 0 35px",
    color: "#6b7280",
    fontSize: "15px",
  },

  buttons: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "12px",
  },

  loginButton: {
    display: "block",
    padding: "13px",
    borderRadius: "9px",
    background: "#2563eb",
    color: "#ffffff",
    textDecoration: "none",
    fontWeight: "bold",
  },

  registerButton: {
    display: "block",
    padding: "13px",
    borderRadius: "9px",
    border: "1px solid #d1d5db",
    color: "#374151",
    textDecoration: "none",
    fontWeight: "bold",
  },
};