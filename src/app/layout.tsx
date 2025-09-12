import type { Metadata } from "next";
import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";
import Script from "next/script";
import Navbar from "@/components/ui-contents/nav-bar";


export const metadata: Metadata = {
  title: "Samir Patel | Full Stack Software Engineer",
  description:
    "I'm Samir Patel, a Full Stack Software Engineer from India with 2+ years of experience building scalable web and mobile applications. Skilled in NestJS, NextJS, iOS, and cloud technologies.",
  keywords: [
    "Samir Patel",
    "Software Enginner",
    "Full Stack Software Engineer",
    "Next.js Developer",
    "iOS Developer",
    "Web Development",
    "Application Development",
  ],

  openGraph: {
    type: "website",
    url: "https://samirpatel.in",
    title: "Samir Patel | Full Stack Software Engineer",
    description:
      "Portfolio of Samir Patel – Full Stack Software Engineer from Surat, India. Experienced in web, mobile, and backend development with Next.js, iOS, AWS, Kubernetes, and Kotlin.",
    siteName: "Samir Patel Portfolio",
    images: [
      {
        url: "https://samirpatel.in/preview-portfolio.png", 
        width: 1200,
        height: 630,
        alt: "Samir Patel Portfolio Preview",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Samir Patel | Full Stack Software Engineer | Application & Web Development | AI/ML Enthusiast",
    description:
      "Portfolio of Samir Patel – Full Stack Software Engineer with 2+ years experience in scalable web, mobile, and backend applications.",
    images: ["https://samirpatel.in/preview-portfolio.png"],
  },

  authors: [{ name: "Samir Patel", url: "https://samirpatel.in" }],
  creator: "Samir Patel",
  publisher: "Samir Patel",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmId = "GTM-NNC9GLFD";
  return (
    <html lang="en">
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
          <Script
          id="structured-data-person"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Samir Patel",
              url: "https://samirpatel.in",
              image: "https://samirpatel.in/preview-portfolio.png",
              jobTitle: "Full Stack Software Engineer",
              description:
                "Full Stack Software Engineer from Surat, India with 2+ years of experience in scalable web, mobile, and backend development. Skilled in Next.js, NestJS, iOS, AWS, Kubernetes, and Kotlin.",
              nationality: "Indian",
              sameAs: [
                "https://github.com/Patel-Samir",
                "https://linkedin.com/in/samir-patel90",
                "https://x.com/SamzZ8506",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
