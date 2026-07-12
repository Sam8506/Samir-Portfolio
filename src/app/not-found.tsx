"use client";
export default function NotFound() {
  return (
    <div className="console-grid flex flex-col items-center justify-center min-h-screen bg-console-bg px-4 text-center font-mono">
      <div className="bg-console-panel border border-console-border p-8 rounded-lg max-w-md w-full">
        <div className="text-console-faint text-xs mb-3">
          $ curl ~{typeof window !== "undefined" ? window.location.pathname : ""}
        </div>
        <h1 className="text-2xl font-medium text-console-amber mb-3">
          404 — not found
        </h1>
        <p className="text-console-muted text-sm mb-6 leading-relaxed">
          This path doesn&apos;t resolve to a page. It may have moved, or
          never existed.
        </p>
        <button
          onClick={() => window.history.back()}
          className="px-5 py-2.5 bg-console-amber text-console-bg rounded-md text-sm font-medium hover:bg-console-amber/90 transition-colors"
        >
          ← go back
        </button>
      </div>
    </div>
  );
}
