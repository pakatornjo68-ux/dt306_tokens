"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("กรุณากรอก Email และ Password");
      return;
    }

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || "Email หรือ Password ไม่ถูกต้อง");
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    router.push("/dashboard");
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logo}>UD</div>

        <h1 style={styles.title}>เข้าสู่ระบบ</h1>

        <p style={styles.description}>
          เข้าสู่ระบบ UD Smart Rental
        </p>

        <form onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              style={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>รหัสผ่าน</label>
            <input
              style={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="กรอกรหัสผ่าน"
            />
          </div>

          <button type="submit" style={styles.button}>
            เข้าสู่ระบบ
          </button>
        </form>

        {error && <p style={styles.error}>{error}</p>}

        <div style={styles.footer}>
          ยังไม่มีบัญชี?{" "}
          <Link href="/register" style={styles.link}>
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
    padding: "30px 20px",
    fontFamily: "Arial, sans-serif",
  },

  card: {
    width: "100%",
    maxWidth: "460px",
    background: "#ffffff",
    borderRadius: "20px",
    padding: "40px",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
  },

  logo: {
    width: "60px",
    height: "60px",
    margin: "0 auto 20px",
    borderRadius: "16px",
    background: "#2563eb",
    color: "#ffffff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "20px",
    fontWeight: "bold",
  },

  title: {
    margin: "0",
    textAlign: "center" as const,
    fontSize: "28px",
    color: "#111827",
  },

  description: {
    margin: "10px 0 30px",
    textAlign: "center" as const,
    color: "#6b7280",
    fontSize: "14px",
  },

  field: {
    marginBottom: "18px",
  },

  label: {
    display: "block",
    marginBottom: "7px",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#374151",
  },

  input: {
    width: "100%",
    boxSizing: "border-box" as const,
    padding: "12px 14px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "14px",
    outline: "none",
  },

  button: {
    width: "100%",
    marginTop: "5px",
    padding: "13px",
    border: "none",
    borderRadius: "9px",
    background: "#2563eb",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  error: {
    marginTop: "18px",
    padding: "12px",
    borderRadius: "8px",
    background: "#fee2e2",
    color: "#dc2626",
    fontSize: "14px",
  },

  footer: {
    marginTop: "25px",
    textAlign: "center" as const,
    fontSize: "14px",
    color: "#6b7280",
  },

  link: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "bold",
  },
};