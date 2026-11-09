import { Download, ExternalLink, FileText } from "lucide-react";

const resumePath = "/Samir_Patel_Resume_FullStack.pdf";

export default function Resume() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-8 font-mono sm:px-6 sm:pt-12">
      <header className="mb-8 flex flex-col gap-6 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-3 flex items-center gap-2 text-sm text-console-amber">
            <span className="text-console-faint">$</span>
            cat resume.pdf
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-console-text-strong sm:text-3xl">
            Resume
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-console-muted">
            A quick overview of my experience, skills, and work. Preview it here
            or download a copy.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href={resumePath}
            download="Samir_Patel_Resume_FullStack.pdf"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-console-amber bg-console-amber px-4 py-2 text-sm font-medium text-console-bg transition-colors hover:bg-console-amber/90"
          >
            <Download aria-hidden="true" size={16} />
            Download PDF
          </a>
          <a
            href={resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-console-border bg-console-panel px-4 py-2 text-sm text-console-text transition-colors hover:border-console-amber/50 hover:text-console-amber"
          >
            <ExternalLink aria-hidden="true" size={16} />
            Open in new tab
          </a>
        </div>
      </header>

      <section
        aria-label="Resume PDF preview"
        className="overflow-hidden rounded-lg border border-console-border bg-console-panel shadow-2xl shadow-black/20"
      >
        <div className="flex items-center justify-between gap-3 border-b border-console-border bg-console-panel-2 px-4 py-3">
          <div className="flex min-w-0 items-center gap-2 text-xs text-console-muted">
            <FileText
              aria-hidden="true"
              size={16}
              className="shrink-0 text-console-amber"
            />
            <span className="truncate">Samir_Patel_Resume_FullStack.pdf</span>
          </div>
          <span className="shrink-0 text-[11px] text-console-faint">
            PDF · 2 pages
          </span>
        </div>

        <iframe
          src={`${resumePath}#view=FitH`}
          title="Samir Patel resume"
          className="block h-[70svh] min-h-[32rem] w-full bg-white sm:h-[78svh] sm:min-h-[40rem]"
        />
      </section>
      <p className="mt-3 text-xs text-console-muted">
        If the preview doesn’t load,{" "}
        <a
          href={resumePath}
          download="Samir_Patel_Resume_FullStack.pdf"
          className="text-console-amber underline underline-offset-4"
        >
          download the resume
        </a>
        .
      </p>
    </main>
  );
}