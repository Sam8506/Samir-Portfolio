"use client";

import { useEffect } from "react";

const styles = {
  body: {
    margin: 0,
    padding: 0,
    backgroundColor: "#f8f8f8",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    textAlign: "center" as const,
    maxWidth: "400px",
  },
  heading: {
    fontSize: "1.8rem",
    marginBottom: "0.75rem",
    color: "#d32f2f",
  },
  message: {
    fontSize: "1rem",
    marginBottom: "1.5rem",
    color: "#333",
  },
  button: {
    padding: "0.6rem 1.2rem",
    backgroundColor: "#1976d2",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1rem",
  },
};

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html>
      <body style={styles.body}>
        <div style={styles.card}>
          <h1 style={styles.heading}>Something went wrong</h1>
          <p style={styles.message}>
            We encountered an unexpected error. Please try again or contact
            support.
          </p>
          <button style={styles.button} onClick={() => reset()}>
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
