import type { Metadata } from "next";
import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/ui-contents/nav-bar";

export const metadata: Metadata = {
  title: "Samir Patel - Software Engineer",
  description: "Created by Samir Patel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmId = "GTM-NNC9GLFD";
  return (
    <html lang="en" suppressHydrationWarning>
      <GoogleTagManager gtmId={gtmId} />
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <div className="mt-10">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
