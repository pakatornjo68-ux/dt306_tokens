"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      router.push("/login");
      return;
    }

    const parsedUser = JSON.parse(userData);

    setTimeout(() => {
      setUser(parsedUser);
    }, 0);
  }, [router]);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  }

  if (!user) {
    return (
      <main style={styles.loading}>
        <p>กำลังโหลด...</p>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <nav style={styles.navbar}>
        <div>
          <h2 style={styles.logo}>UD Smart Rental</h2>
          <span style={styles.subtitle}>ระบบจัดการเช่าอุปกรณ์</span>
        </div>

        <button onClick={logout} style={styles.logoutButton}>
          ออกจากระบบ
        </button>
      </nav>

      <section style={styles.container}>
        <div style={styles.welcome}>
          <p style={styles.smallText}>DASHBOARD</p>
          <h1 style={styles.title}>สวัสดี, {user.name}</h1>
          <p style={styles.description}>
            ยินดีต้อนรับเข้าสู่ระบบจัดการเช่าอุปกรณ์
          </p>
        </div>

        <div style={styles.grid}>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>ข้อมูลผู้ใช้งาน</h2>

            <div style={styles.infoRow}>
              <span>ชื่อ</span>
              <strong>{user.name}</strong>
            </div>

            <div style={styles.infoRow}>
              <span>Email</span>
              <strong>{user.email}</strong>
            </div>

            <div style={styles.infoRow}>
              <span>สิทธิ์</span>
              <span style={styles.role}>{user.role}</span>
            </div>
          </div>

          <div style={styles.card}>
            <h2 style={styles.cardTitle}>เมนูระบบ</h2>

            <button
              style={styles.menuButton}
              onClick={() => router.push("/")}
            >
              หน้าหลัก
            </button>

            <button
              style={styles.menuButton}
              onClick={() => router.push("/register")}
            >
              สมัครสมาชิก
            </button>
          </div>
        </div>

        <div style={styles.roleSection}>
          <h2 style={styles.sectionTitle}>การใช้งานระบบ</h2>

          {user.role === "ADMIN" && (
            <div style={styles.roleCard}>
              <h3>ผู้ดูแลระบบ</h3>
              <p>จัดการผู้ใช้งาน อุปกรณ์ และรายการเช่า</p>
            </div>
          )}

          {user.role === "STAFF" && (
            <div style={styles.roleCard}>
              <h3>พนักงาน</h3>
              <p>จัดการอุปกรณ์และสถานะการเช่า</p>
            </div>
          )}

          {user.role === "CUSTOMER" && (
            <div style={styles.roleCard}>
              <h3>ลูกค้า</h3>
              <p>ดูอุปกรณ์ เช่าอุปกรณ์ และตรวจสอบรายการเช่าของคุณ</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f5f7fa",
    color: "#1f2937",
    fontFamily: "Arial, sans-serif",
  },

  loading: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
  },

  navbar: {
    height: "72px",
    background: "#ffffff",
    borderBottom: "1px solid #e5e7eb",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 40px",
  },

  logo: {
    margin: 0,
    fontSize: "20px",
  },

  subtitle: {
    fontSize: "12px",
    color: "#6b7280",
  },

  logoutButton: {
    border: "none",
    background: "#ef4444",
    color: "#ffffff",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
  },

  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "45px 25px",
  },

  welcome: {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "35px",
    marginBottom: "25px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  },

  smallText: {
    color: "#2563eb",
    fontSize: "13px",
    fontWeight: "bold",
    marginBottom: "8px",
  },

  title: {
    margin: "0 0 8px",
    fontSize: "32px",
  },

  description: {
    margin: 0,
    color: "#6b7280",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "25px",
  },

  card: {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "28px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  },

  cardTitle: {
    fontSize: "18px",
    marginTop: 0,
    marginBottom: "20px",
  },

  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "14px 0",
    borderBottom: "1px solid #f0f0f0",
  },

  role: {
    background: "#e0ecff",
    color: "#2563eb",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
  },

  menuButton: {
    width: "100%",
    textAlign: "left" as const,
    padding: "14px",
    marginBottom: "10px",
    background: "#f8fafc",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
  },

  roleSection: {
    marginTop: "25px",
  },

  sectionTitle: {
    fontSize: "20px",
    marginBottom: "15px",
  },

  roleCard: {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "25px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  },
};