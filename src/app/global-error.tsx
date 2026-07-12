"use client";

import { useEffect } from "react";

const styles = {
  body: {
    margin: 0,
    padding: 0,
    backgroundColor: "#0b0d12",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'JetBrains Mono', 'Courier New', monospace",
  },
  card: {
    backgroundColor: "#12151c",
    border: "1px solid #1f2430",
    padding: "2rem",
    borderRadius: "10px",
    textAlign: "center" as const,
    maxWidth: "400px",
  },
  prompt: {
    fontSize: "0.75rem",
    color: "#5a6072",
    marginBottom: "0.75rem",
    textAlign: "left" as const,
  },
  heading: {
    fontSize: "1.4rem",
    marginBottom: "0.75rem",
    color: "#e8a94e",
    fontWeight: 500,
  },
  message: {
    fontSize: "0.9rem",
    marginBottom: "1.5rem",
    color: "#5a6072",
    lineHeight: 1.6,
  },
  button: {
    padding: "0.65rem 1.4rem",
    backgroundColor: "#e8a94e",
    color: "#0b0d12",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.85rem",
    fontFamily: "inherit",
    fontWeight: 500,
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
          <div style={styles.prompt}>$ process --status</div>
          <h1 style={styles.heading}>process crashed</h1>
          <p style={styles.message}>
            An unexpected error occurred. You can retry the last operation or
            reach out if it keeps happening.
          </p>
          <button style={styles.button} onClick={() => reset()}>
            ↻ retry
          </button>
        </div>
      </body>
    </html>
  );
}
