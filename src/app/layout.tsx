import type { Metadata } from "next";
import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";
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

          <Navbar />
          <div className="mt-10  !bg-gradient-to-b from-[#0b0b12] via-[#0f0f1a] to-[#0b0b12]">{children}</div>
      </body>
    </html>
  );
}
